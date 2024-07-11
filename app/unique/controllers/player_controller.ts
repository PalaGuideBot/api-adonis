import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

import { MojangService } from '#minecraft/services/mojang'
import { PlayerRepository } from '#unique/repositories/player_repository'

@inject()
export default class PlayerController {
  constructor(
    private playerRepository: PlayerRepository,
    private mojangService: MojangService
  ) {}

  async show({ response, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    const player = await this.playerRepository.findByUUID(uuid)

    if (!player) {
      await emitter.emit('unique:user:not-found', params.username)
      return response.notFound({ message: 'Player not found' })
    }

    player.data = player.data.toSorted(
      (a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()
    )

    return response.ok(player)
  }

  async create({ response, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    const exists = await this.playerRepository.findByUUID(uuid)

    if (exists) {
      return response.badRequest({ message: 'Player already exists' })
    }

    const player = await this.playerRepository.create(params.username)

    return response.ok({ message: `Player "${player.username}" created` })
  }
}
