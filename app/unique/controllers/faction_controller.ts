import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ImageService } from '#paladium/services/image'
import { FactionRepository } from '#unique/repositories/faction_repository'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
export default class FactionController {
  constructor(
    private factionRepository: FactionRepository,
    private imageService: ImageService,
    private paladiumService: PaladiumService
  ) {}

  async show({ response, params }: HttpContext) {
    const factionData = await this.paladiumService.getAllFactionData(params.name)

    const emblem = await this.imageService.getOrCreateEmblem(factionData.emblem)

    return response.ok({ ...factionData, emblemUrl: emblem.url })

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
