import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { LinkRepository } from '#link/repositories/link_repository'

@inject()
export default class MinecraftController {
  constructor(private linkRepository: LinkRepository) {}

  async show({ response, params }: HttpContext) {
    const { minecraftUUID } = params as { minecraftUUID: string }

    const player = await this.linkRepository.findByUUID(minecraftUUID)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    return response.ok({
      message: 'This Minecraft account is linked to a Discord account',
      discordId: player.discordId,
    })
  }

  async remove({ response, params }: HttpContext) {
    const { minecraftUUID } = params as { minecraftUUID: string }

    const player = await this.linkRepository.findByUUID(minecraftUUID)
    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    await this.linkRepository.removeByUUID(minecraftUUID)

    return response.ok({ message: 'Player unlinked' })
  }
}
