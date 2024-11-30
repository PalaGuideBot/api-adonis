import { Infer } from '@vinejs/vine/types'

import {
  calculateToolDamage,
  getToolTier,
  isItemInstantMine,
  items,
  pogXp,
} from '#utils/contents/pogs'
import { calculatePogValidator } from '#utils/validators/calculate_validator'

const MULTIPLIERS = {
  MIXED: 1.8,
}

type CalculatePogOptions = Infer<typeof calculatePogValidator>['body']

class PogRepository {
  getXpTotal(body: Omit<CalculatePogOptions, 'petSkillPercentage'>) {
    const { currentLevel, targetLevel } = body

    let xpTotal: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      xpTotal += pogXp[i]
    }

    return xpTotal
  }

  getItemLevelInstantMine(
    item: Parameters<typeof isItemInstantMine>[0],
    options: Pick<
      Parameters<typeof calculateToolDamage>[0],
      'hasteMultiplier' | 'petSkillMultiplier'
    >
  ) {
    for (let i = 1; i <= 100; i++) {
      const toolTier = getToolTier(i)!
      if (
        isItemInstantMine(
          item,
          calculateToolDamage({
            enchantementBonus: toolTier.enchantementBonus,
            toolSpeed: toolTier.toolSpeed,
            ...options,
          })
        )
      ) {
        return i
      }
    }
    return 100
  }

  getItemOSState(
    item: Parameters<typeof isItemInstantMine>[0],
    options: Omit<CalculatePogOptions, 'petSkillPercentage'> &
      Parameters<typeof this.getItemLevelInstantMine>[1]
  ) {
    const { currentLevel, targetLevel, hasteMultiplier, petSkillMultiplier } = options

    const currentToolTier = getToolTier(currentLevel)!
    const targetToolTier = getToolTier(targetLevel)!

    const from = this.getItemLevelInstantMine(item, {
      hasteMultiplier,
      petSkillMultiplier,
    })

    return {
      from: from,
      amount: Math.ceil(this.getXpTotal({ currentLevel: from, targetLevel }) / item.xp),
      targeted: isItemInstantMine(
        item,
        calculateToolDamage({
          enchantementBonus: targetToolTier.enchantementBonus,
          toolSpeed: targetToolTier.toolSpeed,
          hasteMultiplier,
          petSkillMultiplier,
        })
      ),
      current: isItemInstantMine(
        item,
        calculateToolDamage({
          enchantementBonus: currentToolTier.enchantementBonus,
          toolSpeed: currentToolTier.toolSpeed,
          hasteMultiplier,
          petSkillMultiplier,
        })
      ),
    }
  }

  calculate(body: CalculatePogOptions) {
    const { currentLevel, targetLevel, petSkillPercentage } = body

    const xpTotal = this.getXpTotal(body)
    const currentTier = getToolTier(currentLevel)!
    const targetTier = getToolTier(targetLevel)!

    const result = items.map((item) => ({
      ...item,
      os: {
        default: this.getItemOSState(item, {
          currentLevel,
          targetLevel,
          hasteMultiplier: 0,
          petSkillMultiplier: 0,
        }),
        with_mixed: this.getItemOSState(item, {
          currentLevel,
          targetLevel,
          hasteMultiplier: MULTIPLIERS.MIXED,
          petSkillMultiplier: 0,
        }),
        with_pet_skill: this.getItemOSState(item, {
          currentLevel,
          targetLevel,
          hasteMultiplier: 0,
          petSkillMultiplier: petSkillPercentage !== 0 ? petSkillPercentage / 100 + 1 : 0,
        }),
        with_pet_skill_and_mixed: this.getItemOSState(item, {
          currentLevel,
          targetLevel,
          hasteMultiplier: MULTIPLIERS.MIXED,
          petSkillMultiplier: petSkillPercentage !== 0 ? petSkillPercentage / 100 + 1 : 0,
        }),
      },
    }))

    return {
      xpTotal,
      currentTier: currentTier.tier,
      targetTier: targetTier.tier,
      items: result,
    }
  }
}

export { PogRepository }
