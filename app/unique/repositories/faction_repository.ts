import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'
import { faction as defaultFaction } from '#unique/contents/default'

@inject()
class FactionRepository {
  constructor(private paladiumService: PaladiumService) {}

  async findByName(name: string) {
    if (name.toLowerCase() === 'guidebot') {
      return defaultFaction
    }

    return await db.factions.findOne({ name: name.toLowerCase() }).lean()
  }

  async create(name: string) {
    const factionData = await this.paladiumService.getAllFactionData(name)

    const faction = new db.factions({
      uuid: factionData.uuid,
      date: DateTime.now().toFormat('yyyy-MM-dd'),
      newDate: new Date(),
      name: factionData.name.toLowerCase(),
      bgName: factionData.name,
      description: factionData.description,
      createdAt: factionData.createdAt,
      emblem: factionData.emblem,
      alliance: factionData.alliance,
      players: factionData.members.data,
      retry: {
        count: 0,
        disabled: false,
      },
    })

    await faction.save()

    return faction.toObject()
  }

  async countByDate() {
    return await db.factions.aggregate<{ _id: string; count: number }>([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  }
}

export { FactionRepository }
