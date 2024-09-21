import { db } from '#core/services/db'
import { DateTime } from 'luxon'

import { config } from '#leaderboard/contents/categories'

class UpdateRepository {
  todayDate: string
  constructor() {
    this.todayDate = DateTime.now().toFormat('yyyy-MM-dd')
  }

  async aggregateData(model: any) {
    const aggregation = await model.aggregate([
      { $project: { dateExists: { $in: [this.todayDate, '$data.date'] } } },
      {
        $group: {
          _id: null,
          updated: { $sum: { $cond: ['$dateExists', 1, 0] } },
          notUpdated: { $sum: { $cond: ['$dateExists', 0, 1] } },
        },
      },
    ])

    return aggregation[0] || { updated: 0, notUpdated: 0 }
  }

  async checkUpdate(model: any) {
    const haveDate = await model.findOne({ date: this.todayDate })
    return Boolean(haveDate)
  }

  async updateObject() {
    const usersAggregation = await this.aggregateData(db.players)
    const factionsAggregation = await this.aggregateData(db.factions)

    const responseObject: Record<string, boolean> = {}

    for (const model of config) {
      responseObject[model.name] = await this.checkUpdate(model.model)
    }

    return {
      update: responseObject,
      uniquePlayers: usersAggregation,
      uniqueFactions: factionsAggregation,
    }
  }
}

export { UpdateRepository }
