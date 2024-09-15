import { jobXp, xpPerItem } from '#utils/contents/jobs'
import { calculateJobValidator } from '#utils/validators/calculate_validator'
import { Infer } from '@vinejs/vine/types'

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

type JobString = Infer<typeof calculateJobValidator>

class JobRepository {
  async getXpTotal(body: {
    currentLevel: number
    targetLevel: number
    bonusXp: number
    currentXp: number
  }): Promise<number> {
    const { currentLevel, targetLevel, bonusXp, currentXp } = body
    let totalXp: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      totalXp += jobXp[i]
    }

    totalXp -= currentXp
    const xpWithBonus = totalXp * (1 + bonusXp / 100)

    return Math.ceil(xpWithBonus)
  }

  async getXpPerItemForJob(body: {
    currentLevel: number
    targetLevel: number
    bonusXp: number
    currentXp: number
    job: JobString['job']
  }): Promise<{ xpTotal: number; items: Item[] }> {
    const { currentLevel, targetLevel, job } = body
    const xpTotalResponses = await this.getXpTotal(body)

    const items: Item[] = []

    for (const item of xpPerItem[job]) {
      if (item.from > body.targetLevel) continue
      if (Number.isNaN(item.xp)) continue
      const currLevel: number = item.from <= currentLevel ? currentLevel : item.from
      const tarLevel: number = item.to >= targetLevel ? targetLevel : item.to
      const xpPerItemResponses = await this.getXpTotal({
        ...body,
        targetLevel: tarLevel,
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

    const itemsFiltered = items.filter((item) => item.amount > 0)

    return {
      xpTotal: xpTotalResponses,
      items: itemsFiltered,
    }
  }

  async getLevelReachedWithXp(
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

  async getXpTotalForItem(body: {
    currentLevel: number
    bonusXp: number
    currentXp: number
    job: JobString['job']
    item: string
    amount: number
  }): Promise<{ level: number; xpTotal: number }> {
    const { job, item, currentLevel, bonusXp, currentXp, amount } = body
    const itemFind = xpPerItem[job].find((i) => i.type.toLowerCase().replace(/ /g, '-') === item)
    if (!itemFind) return { level: 0, xpTotal: 0 }

    const xpTotalForItem = Math.ceil((itemFind.xp * amount + currentXp) * (1 + bonusXp / 100))

    const levelReached = await this.getLevelReachedWithXp(xpTotalForItem, currentXp, currentLevel)

    return levelReached
  }

  async getItemListing(): Promise<
    { type: string; id: string; job: 'miner' | 'farmer' | 'hunter' | 'alchemist' }[]
  > {
    const items: { type: string; id: string; job: 'miner' | 'farmer' | 'hunter' | 'alchemist' }[] =
      []

    for (const [job, jobItems] of Object.entries(xpPerItem)) {
      if (['miner', 'farmer', 'hunter', 'alchemist'].includes(job)) {
        for (const item of jobItems) {
          items.push({
            type: item.type,
            id: item.type.toLowerCase().replace(/ /g, '-'),
            job: job as 'miner' | 'farmer' | 'hunter' | 'alchemist',
          })
        }
      }
    }

    return items
  }
}

export { JobRepository }
