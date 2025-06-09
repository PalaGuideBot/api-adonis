import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { ImageService } from '#paladium/services/image'
import { PaladiumService } from '#paladium/services/paladium'
import { faction as defaultFaction } from '#unique/contents/default'
import { FactionRepository } from '#unique/repositories/faction_repository'

@inject()
export default class FactionController {
  constructor(
    private factionRepository: FactionRepository,
    private imageService: ImageService,
    private paladiumService: PaladiumService
  ) {}

  async show({ response, params }: HttpContext) {
    let result = null

    try {
      result = await cache.getOrSet({
        key: `faction:${params.name}`,
        factory: async () => {
          const faction =
            params.name.toLowerCase() === 'guidebot'
              ? defaultFaction
              : await this.paladiumService.getAllFactionData(params.name)

          const emblem = await this.imageService.getOrCreateEmblem(faction.emblem)

          return {
            ...faction,
            emblemUrl: emblem.url,
            name: faction.name.toLowerCase(),
            bgName: faction.name,
          }
        },
        ttl: '1h',
      })
    } catch {}

    if (!result) {
      return response.notFound({ message: `Faction '${params.name}' not found.` })
    }

    return response.ok(result)

    /*let faction = await this.factionRepository.findByName(params.name)

    if (!faction) {
      try {
        faction = await this.factionRepository.create(params.name)
      } catch {
        return response.notFound({ message: 'Faction not found' })
      }
    }

    const emblem = await this.imageService.getOrCreateEmblem(faction.emblem)

    return response.ok({ ...faction, emblemUrl: emblem.url })*/
  }

  async create({ response, params }: HttpContext) {
    const exists = await this.factionRepository.findByName(params.name)

    if (exists) {
      return response.badRequest({ message: 'Faction already exists' })
    }

    //const faction = await this.factionRepository.create(params.name)

    return response.ok({ message: `Faction create has removed for now` })
  }
}
