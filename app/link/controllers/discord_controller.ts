import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { LinkRepository } from '#link/repositories/link_repository'

@inject()
export default class DiscordController {
  constructor(private linkRepository: LinkRepository) {}

  async show({ response, params }: HttpContext) {
    const { discordId } = params as { discordId: string }

    const player = await this.linkRepository.findByDiscordId(discordId)
    if (!player || !player.minecraftUUID) {
      return response.notFound({ message: 'Player not found' })
    }

    const username = await this.linkRepository.findNameByUUID(player.minecraftUUID)

    return response.ok({
      message: 'This Discord account is linked to the Minecraft account',
      uuid: player.minecraftUUID,
      username,
    })
  }

  async remove({ response, params }: HttpContext) {
    const { discordId } = params as { discordId: string }

    const player = await this.linkRepository.findByDiscordId(discordId)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    await this.linkRepository.removeByDiscordId(discordId)

    return response.ok({ message: 'Player unlinked' })
  }
}
