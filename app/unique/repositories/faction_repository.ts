import { inject } from '@adonisjs/core'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
class FactionRepository {
  constructor(private paladium: PaladiumService) {}

  async findByName(name: string) {
    const faction = await db.factions.findOne({ name: name.toLowerCase() })
    return faction
  }

  async create(name: string) {
    const factionData = await this.paladium.getAllFactionData(name)

    const faction = new db.factions({
      uuid: factionData.uuid,
      name: factionData.name.toLowerCase(),
      bgName: factionData.name,
      description: factionData.description,
      createdAt: factionData.createdAt,
      emblem: factionData.emblem,
      players: factionData.members.data,
      data: [],
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
