import { pogXp, xpPerItem } from '#utils/contents/pogs'

interface PogItem {
  name: string
  xp: number
  from: number
}

interface Item {
  currLevel: number
  tarLevel: number
  xp: number
  amount: number
  item: PogItem
}

class PogRepository {
  async getXpTotal(body: {
    currentLevel: number
    targetLevel: number
    currentXp: number
  }): Promise<number> {
    const { currentLevel, targetLevel } = body
    let xpTotal = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      xpTotal += pogXp[i]
    }

    xpTotal -= body.currentXp

    return xpTotal
  }

  private async calculateItems(
    body: { currentLevel: number; targetLevel: number; currentXp: number },
    itemsSource: { with_os: PogItem[]; without_os: PogItem[] },
    type: 'with_os' | 'without_os'
  ): Promise<Item[]> {
    const { currentLevel, targetLevel } = body
    const xpTotalResponses = await this.getXpTotal(body)
    const items: Item[] = []

    for (const item of itemsSource[type]) {
      if (item.from > targetLevel || Number.isNaN(item.xp)) continue

      const currLevel = Math.max(item.from, currentLevel)
      const xpPerItemResponses = await this.getXpTotal({
        ...body,
        currentLevel: currLevel,
        currentXp: 0,
      })

      items.push({
        currLevel,
        tarLevel: targetLevel,
        xp: xpPerItemResponses,
        amount: Math.ceil(xpTotalResponses / item.xp),
        item,
      })
    }

    return items
  }

  async getXpPerItemForPog(body: {
    currentLevel: number
    targetLevel: number
    currentXp: number
  }): Promise<{
    xpTotal: number
    items: {
      with_os: Item[]
      without_os: Item[]
    }
  }> {
    const xpTotal = await this.getXpTotal(body)

    const itemsWithOs = await this.calculateItems(body, xpPerItem, 'with_os')
    const itemsWithoutOs = await this.calculateItems(body, xpPerItem, 'without_os')

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
