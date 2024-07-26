import { inject } from '@adonisjs/core'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
class FactionRepository {
  constructor(private paladium: PaladiumService) {}

  async findByName(name: string) {
    const nameLower = name.toLowerCase()
    const get = await db.factions.findOne({ name: nameLower })
    console.log(get)
    return get
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
}

export { FactionRepository }
