import { jobXp, xpPerItem } from '#utils/contents/jobs'

interface Item {
  currLevel: number
  tarLevel: number
  xp: number
  amount: number
  item: {
    type: string
    action: string
    xp: number
    from: number
  }
}

class JobRepository {
  async xpTotal(
    currentLevel: number,
    targetLevel: number,
    bonusXp: number,
    currentXp: number
  ): Promise<number> {
    let totalXp: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      totalXp += jobXp[i]
    }

    totalXp -= currentXp
    const xpWithBonus = totalXp * (1 + bonusXp / 100)

    return Math.ceil(xpWithBonus)
  }

  async xpPerItemForJob(
    job: string,
    currentLevel: number,
    targetLevel: number,
    bonusXp: number,
    currentXp: number
  ): Promise<{ xpTotal: number; items: Item[] }> {
    const xpTotalResponses = await this.xpTotal(currentLevel, targetLevel, bonusXp, currentXp)

    const items: Item[] = []

    for (const item of xpPerItem[job]) {
      if (item.from > targetLevel) continue
      if (Number.isNaN(item.xp)) continue
      const currLevel: number = item.from <= currentLevel ? currentLevel : item.from
      const xpPerItemResponses = await this.xpTotal(currLevel, targetLevel, bonusXp, 0)

      items.push({
        currLevel,
        tarLevel: targetLevel,
        xp: xpPerItemResponses,
        amount: Math.ceil(xpTotalResponses / item.xp),
        item,
      })
    }

    return {
      xpTotal: xpTotalResponses,
      items,
    }
  }

  async levelReachedWithXp(
    xp: number,
    currentXp: number,
    currentLevel: number
  ): Promise<{ level: number; xpTotal: number }> {
    let xpTotal = currentXp
    let level = currentLevel

    while (xpTotal < xp) {
      xpTotal += jobXp[level]
      level++
    }

    return {
      level,
      xpTotal,
    }
  }

  async xpTotalForItem(
    job: string,
    item: string,
    currentLevel: number,
    bonusXp: number,
    currentXp: number,
    amount: number
  ): Promise<{ level: number; xpTotal: number }> {
    const itemFind = xpPerItem[job].find((i) => i.type.toLowerCase().replace(/ /g, '-') === item)
    if (!itemFind) return { level: 0, xpTotal: 0 }

    const xpTotalForItem = Math.ceil((itemFind.xp * amount + currentXp) * (1 + bonusXp / 100))

    const levelReached = await this.levelReachedWithXp(xpTotalForItem, currentXp, currentLevel)

    return levelReached
  }

  async itemListing(): Promise<{ type: string; id: string; job: string }[]> {
    const items: { type: string; id: string; job: string }[] = []

    for (const [job, jobItems] of Object.entries(xpPerItem)) {
      for (const item of jobItems) {
        items.push({ type: item.type, id: item.type.toLowerCase().replace(/ /g, '-'), job })
      }
    }

    return items
  }
}

export { JobRepository }
