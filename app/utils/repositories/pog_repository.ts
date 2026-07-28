import { Exception } from '@adonisjs/core/exceptions'
import { type Infer } from '@vinejs/vine/types'

import { getToolTier, items, pogXp } from '#utils/contents/pogs'
import { type Item } from '#utils/types'
import { type calculatePogValidator } from '#utils/validators/calculate_validator'

type CalculatePogOptions = Infer<typeof calculatePogValidator>['body']

class PogRepository {
  getItems() {
    return items.map(({ from, ...item }) => item)
  }

  getXpTotal(
    body: Pick<CalculatePogOptions, 'currentLevel' | 'currentXp'> & { targetLevel: number }
  ) {
    const { currentLevel, currentXp, targetLevel } = body

    let xpTotal: number = 0

    for (let i = currentLevel; i < pogXp.length; i++) {
      if (i > targetLevel) {
        break
      }

      let xp = pogXp[i]

      if (i === currentLevel) {
        xp -= Math.max(0, xp - currentXp)
      }

      xpTotal += xp
    }

    return xpTotal
  }

  calculate(body: CalculatePogOptions) {
    const { block, ...options } = body

    const targetItem = items.find((i) => i.id === block)

    if (!targetItem) {
      throw new Exception('Item not found', { code: 'E_POG_ITEM_NOT_FOUND', status: 404 })
    }

    const currentTier = getToolTier(options.currentLevel)!

    const result = items.map((item) => ({
      id: item.id,
      name: item.name,
      xp: item.xp,
      os: {
        default: this.resolveItemOSState('default', item, targetItem, options),
        with_mixed: this.resolveItemOSState('with_mixed', item, targetItem, options),
        with_green: this.resolveItemOSState('with_green', item, targetItem, options),
        with_pet_skill: this.resolveItemOSState('with_pet_skill', item, targetItem, options),
        with_pet_skill_and_mixed: this.resolveItemOSState(
          'with_pet_skill_and_mixed',
          item,
          targetItem,
          options
        ),
      },
    }))

    return {
      item: result.find((i) => i.id === block)!,
      currentTier: currentTier.tier,
      items: result,
    }
  }

  protected resolveItemFrom<T extends keyof Item['from']>(
    item: Item,
    state: T,
    options: Pick<CalculatePogOptions, 'goodPickaxePercentage'>
  ) {
    const { goodPickaxePercentage } = options

    let from = 0

    switch (state) {
      case 'default':
        from = item.from.default
        break
      case 'with_mixed':
        from = item.from.with_mixed
        break
      case 'with_green':
        from = item.from.with_green
        break
      case 'with_pet_skill':
        from = item.from.with_pet_skill(goodPickaxePercentage)
        break
      case 'with_pet_skill_and_mixed':
        from = item.from.with_pet_skill_and_mixed(goodPickaxePercentage, item.from.with_mixed)
        break
    }

    return from
  }

  protected resolveItemOSState<T extends keyof Item['from']>(
    state: T,
    item: Item,
    targetItem: Item,
    options: Omit<CalculatePogOptions, 'block'>
  ) {
    const { currentLevel, currentXp, goodPickaxePercentage, experiencedPickaxePercentage } = options

    const from = this.resolveItemFrom(item, state, { goodPickaxePercentage })
    const targetFrom = this.resolveItemFrom(targetItem, state, { goodPickaxePercentage })
    const targetTier = getToolTier(from)!

    return {
      from: from,
      targetTier: targetTier.tier,
      xp: this.getXpTotal({
        currentXp: currentXp,
        currentLevel: currentLevel,
        targetLevel: targetFrom > from ? targetFrom : from,
      }),
      amount: Math.ceil(
        this.getXpTotal({
          currentXp: currentXp,
          currentLevel: currentLevel,
          targetLevel: targetFrom > from ? targetFrom : from,
        }) /
          (item.xp * (1 + experiencedPickaxePercentage / 100))
      ),
      current: currentLevel >= from,
    }
  }
}

export { PogRepository }
