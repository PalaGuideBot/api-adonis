import { inject } from '@adonisjs/core'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'
import { faction as defaultFaction } from '#unique/contents/default'
import { DateTime } from 'luxon'

@inject()
class FactionRepository {
  constructor(private paladiumService: PaladiumService) {}

  async findByName(name: string) {
    if (name.toLowerCase() === 'guidebot') {
      return defaultFaction
    }
    const faction = await db.factions.findOne({ name: name.toLowerCase() }).lean()
    return faction
  }

  async create(name: string) {
    const factionData = await this.paladiumService.getAllFactionData(name)

    const faction = new db.factions({
      uuid: factionData.uuid,
      name: factionData.name.toLowerCase(),
      bgName: factionData.name,
      description: factionData.description,
      createdAt: factionData.createdAt,
      emblem: factionData.emblem,
      players: factionData.members.data,
      data: [
        {
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          data: {
            level: {
              level: factionData.level.level,
              xp: factionData.level.xp,
            },
            elo: 0,
          },
        },
      ],
      retry: {
        count: 0,
        disabled: false,
      },
    })

    return faction.save()
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
