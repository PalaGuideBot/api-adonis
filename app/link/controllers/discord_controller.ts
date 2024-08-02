import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { DiscordRepository } from '../repositories/discord_repository.js'

@inject()
export default class DiscordController {
  constructor(private discordRepository: DiscordRepository) {}

  async show({ response, request }: HttpContext) {
    const { discordId } = request.params() as { discordId: string }

    const player = await this.discordRepository.findByDiscordId(discordId)
    if (!player || !player.minecraftUUID) {
      return response.notFound({ message: 'Player not found' })
    }

    const username = await this.discordRepository.findNameByMinecraftUUID(player.minecraftUUID)

    return response.ok({
      message: 'This Discord account is linked to the Minecraft account',
      UUID: player.minecraftUUID,
      username,
    })
  }

  async remove({ response, request }: HttpContext) {
    const { discordId } = request.params() as { discordId: string }

    const player = await this.discordRepository.findByDiscordId(discordId)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    await this.discordRepository.removeByDiscordId(discordId)

    return response.ok({ message: 'Player unlinked' })
  }
}
