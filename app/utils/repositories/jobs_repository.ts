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

    return Math.ceil(totalXp / bonusXp)
  }

  getXpPerItemForJob(body: CalculateJobResult) {
    const { currentLevel, targetLevel, job, bonusXp } = body

    const xpTotal = this.getXpTotal({
      ...body,
      bonusXp: 1,
    })

    const itemsMap: { [key: string]: Item[] } = {}

    for (const item of xpPerItem[job]) {
      if (item.from > targetLevel || Number.isNaN(item.xp)) {
        continue
      }

      for (const m of item.type.includes('Bottle') ? [1] : [1, 2, 10]) {
        const xpMult = this.getXpTotal({
          ...body,
          bonusXp: m + bonusXp / 100,
        })

        const multString = m === 1 ? 'without' : `x${m}`
        if (!itemsMap[multString]) {
          itemsMap[multString] = []
        }

        itemsMap[multString].push({
          currLevel: currentLevel,
          tarLevel: targetLevel,
          xp: xpMult,
          amount: Math.ceil(xpMult / item.xp),
          item,
        })
      }
    }

    const itemsMapFiltered = Object.entries(itemsMap).reduce(
      (acc, [key, value]) => {
        const itemsFiltered = value.filter((item) => item.amount > 0)
        acc[key] = itemsFiltered
        return acc
      },
      {} as Record<string, Item[]>
    )

    return {
      xpTotal: xpTotal,
      items: itemsMapFiltered,
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
    const xp = Math.ceil(baseXp * multiplierBonus)
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
