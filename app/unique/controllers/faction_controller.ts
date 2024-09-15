import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
//import emitter from '@adonisjs/core/services/emitter'

import { ImageService } from '#paladium/services/image'
import { FactionRepository } from '#unique/repositories/faction_repository'

@inject()
export default class FactionController {
  constructor(
    private factionRepository: FactionRepository,
    private imageService: ImageService
  ) {}

  async show({ response, params }: HttpContext) {
    const faction = await this.factionRepository.findByName(params.name)

    if (!faction) {
      //await emitter.emit('unique:faction:not-found', params.name)
      return response.notFound({ message: 'Faction not found' })
    }

    const emblem = await this.imageService.getOrCreateEmblem(faction.emblem)

    return response.ok({ ...faction, emblemUrl: emblem.url })
  }

  async create({ response, params }: HttpContext) {
    const exists = await this.factionRepository.findByName(params.name)

    if (exists) {
      return response.badRequest({ message: 'Faction already exists' })
    }

    const faction = await this.factionRepository.create(params.name)

    return response.ok({ message: `Faction "${faction.name}" created` })
  }
}
