import { Infer } from '@vinejs/vine/types'

import { jobXp, xpPerItem } from '#utils/contents/jobs'
import { calculateJobValidator } from '#utils/validators/calculate_validator'

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

type CalculateJobResult = Infer<typeof calculateJobValidator>['body']

class JobRepository {
  getXpTotal(body: Omit<CalculateJobResult, 'job'>) {
    const { currentLevel, targetLevel, bonusXp, currentXp } = body

    let totalXp: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      totalXp += jobXp[i]
    }

    totalXp -= currentXp
    const xpWithBonus = totalXp - (totalXp * bonusXp) / 100

    return Math.ceil(xpWithBonus)
  }

  getXpPerItemForJob(body: CalculateJobResult) {
    const { currentLevel, targetLevel, job } = body

    const xpTotal = this.getXpTotal(body)

    const items: Item[] = []

    for (const item of xpPerItem[job]) {
      if (item.from > body.targetLevel || Number.isNaN(item.xp)) {
        continue
      }

      const currLevel = item.from <= currentLevel ? currentLevel : item.from
      const tarLevel = item.to >= targetLevel ? targetLevel : item.to

      const xp = this.getXpTotal({
        ...body,
        targetLevel: tarLevel,
        currentLevel: currLevel,
        currentXp: 0,
      })

      items.push({
        currLevel,
        tarLevel: targetLevel,
        xp: xp,
        amount: Math.ceil(xpTotal / item.xp),
        item,
      })
    }

    const itemsFiltered = items.filter((item) => item.amount > 0)

    return {
      xpTotal: xpTotal,
      items: itemsFiltered,
    }
  }

  getLevelReachedWithXp(xp: number, currentXp: number, currentLevel: number) {
    let xpTotal = currentXp
    let level = currentLevel

    while (xpTotal < xp && level < jobXp.length) {
      xpTotal += jobXp[level]
      level++
    }

    return { level, xpTotal }
  }

  calculateXpScenario(
    baseXp: number,
    multiplier: number,
    currentXp: number,
    bonusXp: number,
    currentLevel: number
  ) {
    const multiplierBonus = multiplier + bonusXp / 100
    const xp = Math.ceil(baseXp / multiplierBonus)
    const level = this.getLevelReachedWithXp(xp, currentXp, currentLevel)
    return { xp, level }
  }

  getXpTotalForItem(
    body: Omit<CalculateJobResult, 'targetLevel'> & { item: string; amount: number }
  ) {
    const { job, item, currentLevel, bonusXp, currentXp, amount } = body

    const target = xpPerItem[job].find((i) => i.type.toLowerCase().replace(/ /g, '-') === item)

    if (!target) {
      throw new Error(`Item "${item}" not found for job "${job}"`)
    }

    const baseXp = target.xp * amount

    const multipliers = item.includes('bottle') ? [1] : [1, 2, 10]

    const xpScenario = multipliers.reduce(
      (acc, multiplier, index) => {
        const key = index === 0 ? 'without' : `x${multiplier}`
        acc[key] = this.calculateXpScenario(baseXp, multiplier, currentXp, bonusXp, currentLevel)
        return acc
      },
      {} as Record<string, ReturnType<typeof this.calculateXpScenario>>
    )

    return xpScenario
  }

  getItems() {
    const items: Array<{ type: string; id: string; job: CalculateJobResult['job'] }> = []

    for (const [job, jobItems] of Object.entries(xpPerItem)) {
      if (['miner', 'farmer', 'hunter', 'alchemist'].includes(job)) {
        for (const item of jobItems) {
          items.push({
            type: item.type,
            id: item.type.toLowerCase().replaceAll(/ /g, '-'),
            job: job as CalculateJobResult['job'],
          })
        }
      }
    }

    return items
  }
}

export { JobRepository }
