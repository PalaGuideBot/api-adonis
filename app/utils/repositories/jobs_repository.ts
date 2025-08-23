import { Infer } from '@vinejs/vine/types'

import { getNextNeededXpForLevel, jobXp, rewardsPerJob, xpPerItem } from '#utils/contents/jobs'
import type { JobReward } from '#utils/types'
import { calculateJobValidator } from '#utils/validators/calculate_validator'

interface Item {
  currLevel: number
  tarLevel: number
  xp: number
  amount: number
  item: {
    type: string
    id: string
    action: string
    xp: number
    from: number
  }
}

type CalculateJobResult = Infer<typeof calculateJobValidator>['body']
type StandardCalculateJobResult = Extract<CalculateJobResult, { mode: 'standard' }>
type ReverseCalculateJobResult = Extract<CalculateJobResult, { mode: 'reverse' }>

class JobRepository {
  getXpTotal(body: Omit<StandardCalculateJobResult, 'job' | 'mode'>) {
    const { currentLevel, targetLevel, bonusXp, currentXp } = body

    let totalXp: number = 0

    for (let i = currentLevel; i < targetLevel; i++) {
      totalXp += getNextNeededXpForLevel(i)
    }

    totalXp -= currentXp

    return Math.ceil(totalXp / bonusXp)
  }

  getXpPerItemForJob(body: StandardCalculateJobResult) {
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

    const rewards = this.getRewards(job, currentLevel + 1, targetLevel)

    return {
      xpTotal: xpTotal,
      items: itemsMapFiltered,
      rewards,
    }
  }

  getLevelReachedWithXp(xp: number, currentXp: number, currentLevel: number) {
    let xpTotal = currentXp
    let level = currentLevel

    while (xpTotal < xp) {
      xpTotal += getNextNeededXpForLevel(level)

      if (xpTotal < xp) {
        level++
      }
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
    const items: Array<{
      type: string
      id: string
      action: string
      from: number
      xp: number
      job: CalculateJobResult['job']
    }> = []

    for (const [job, jobItems] of Object.entries(xpPerItem)) {
      if (['miner', 'farmer', 'hunter', 'alchemist'].includes(job)) {
        for (const item of jobItems) {
          items.push({
            type: item.type,
            id: item.id,
            action: item.action,
            from: item.from,
            xp: item.xp,
            job: job as CalculateJobResult['job'],
          })
        }
      }
    }

    return items
  }

  getLevels() {
    return jobXp
  }

  getRewards(job: keyof typeof rewardsPerJob, from: number, to: number) {
    const target = rewardsPerJob[job]

    const rewards = Object.entries(target)
      .filter(([key]) => Number(key) >= from && Number(key) <= to)
      .flatMap(([, value]) => value)

    return Object.values(
      rewards.reduce(
        (acc, item) => {
          if (!acc[item.id]) {
            acc[item.id] = { ...item }
          } else {
            const existing = acc[item.id]

            if (existing.quantity && item.quantity) {
              existing.quantity += item.quantity
            }
          }

          return acc
        },
        {} as Record<string, JobReward>
      )
    )
  }

  calculateXpFromItems(options: ReverseCalculateJobResult) {
    const { job, currentLevel, currentXp, bonusXp, items } = options

    const targetItems = xpPerItem[job].filter((item) =>
      items.some((i) => i.itemId === item.id && i.action === item.action)
    )

    let result: Record<
      string,
      {
        items: Array<{ item: Item['item']; xp: number }>
        totalXp: number
        reachedLevel: number
        rewards: JobReward[]
      }
    > = {}

    for (const item of targetItems) {
      const quantity = items.find((i) => i.itemId === item.id && i.action === item.action)!.quantity

      for (let multiplier of [1, 2, 10]) {
        const multiplierString = multiplier === 1 ? 'without' : `x${multiplier}`

        if (!result[multiplierString]) {
          result[multiplierString] = {
            items: [],
            totalXp: 0,
            reachedLevel: currentLevel,
            rewards: [],
          }
        }

        if (Number.isNaN(item.xp)) {
          continue
        }

        if (item.type.includes('Bottle') && multiplier !== 1) {
          multiplier = 1
        }

        const xp = Math.ceil(quantity * item.xp * (multiplier + bonusXp / 100))

        result[multiplierString].items.push({ item, xp })
      }
    }

    result = Object.fromEntries(
      Object.entries(result).map(([key, value]) => {
        const totalXp = value.items.reduce((sum, item) => sum + item.xp, 0)
        const { level: reachedLevel } = this.getLevelReachedWithXp(totalXp, currentXp, currentLevel)
        const rewards = this.getRewards(job, currentLevel + 1, reachedLevel)
        return [key, { ...value, totalXp, reachedLevel, rewards }]
      })
    )

    return result
  }
}

export { JobRepository }
