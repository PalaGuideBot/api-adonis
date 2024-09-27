import { Infer } from '@vinejs/vine/types'

import { pogCategories, pogXp, xpPerItem } from '#utils/contents/pogs'
import type { PogItem } from '#utils/types'
import { calculatePogValidator } from '#utils/validators/calculate_validator'

interface Item {
  currLevel: number
  tarLevel: number
  xp: number
  amount: number
  item: PogItem
}

type PogCategory = (typeof pogCategories)[number]

type CalculatePogResult = Infer<typeof calculatePogValidator>['body']

class PogRepository {
  getXpTotal(body: CalculatePogResult) {
    const { currentLevel, targetLevel } = body

    let xpTotal: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      xpTotal += pogXp[i]
    }

    return xpTotal
  }

  private calculateItems(
    body: CalculatePogResult,
    itemsSource: Record<PogCategory, PogItem[]>,
    category: PogCategory
  ) {
    const { currentLevel, targetLevel } = body

    const items: Item[] = []

    for (const item of itemsSource[category]) {
      if (item.from > targetLevel || Number.isNaN(item.xp)) {
        continue
      }

      const currrLevel = item.from <= currentLevel ? currentLevel : item.from
      const tarLevel = item.to >= targetLevel ? targetLevel : item.to

      const xp = this.getXpTotal({
        ...body,
        targetLevel: tarLevel,
        currentLevel: currrLevel,
      })

      items.push({
        currLevel: currrLevel,
        tarLevel,
        xp,
        amount: Math.ceil(xp / item.xp),
        item,
      })
    }

    return items
  }

  getXpPerItemForPog(body: CalculatePogResult): {
    xpTotal: number
    items: Record<PogCategory, Item[]>
  } {
    const xpTotal = this.getXpTotal(body)

    const itemsWithOs = this.calculateItems(body, xpPerItem, 'with_os')
    const itemsWithoutOs = this.calculateItems(body, xpPerItem, 'without_os')

    return {
      xpTotal,
      items: {
        with_os: itemsWithOs,
        without_os: itemsWithoutOs,
      },
    }
  }
}

export { PogRepository }
