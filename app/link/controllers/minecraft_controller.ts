import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { MinecraftRepository } from '../repositories/minecraft_repository.js'

@inject()
export default class MinecraftController {
  constructor(private minecraftRepository: MinecraftRepository) {}

  async show({ response, request }: HttpContext) {
    const { minecraftUUID } = request.params() as { minecraftUUID: string }

    const player = await this.minecraftRepository.findByUUID(minecraftUUID)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    return response.ok({
      message: 'This Minecraft account is linked to a Discord account',
      discordId: player.discordId,
    })
  }

  async remove({ response, request }: HttpContext) {
    const { minecraftUUID } = request.params() as { minecraftUUID: string }

    const player = await this.minecraftRepository.findByUUID(minecraftUUID)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    await this.minecraftRepository.removeByUUID(minecraftUUID)

    return response.ok({ message: 'Player unlinked' })
  }
}
