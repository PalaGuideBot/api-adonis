import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { tokenValidator, verifyValidator } from '#link/validators/token_validator'
import { LinkRepository } from '#link/repositories/link_repository'

@inject()
export default class TokenController {
  constructor(private linkRepository: LinkRepository) {}

  async generate({ response, request }: HttpContext) {
    const body = await request.validateUsing(tokenValidator)
    const { discordId } = body

    const link = await this.linkRepository.findByDiscordId(discordId)
    if (link && link.minecraftUUID) {
      return response.badRequest({ message: 'Discord account already linked' })
    } else if (link && !link.minecraftUUID) {
      const { token, expiredAt } = link
      return response.ok({ token, expiredAt, message: 'Token already generated' })
    }

    const token = await this.linkRepository.generateToken()
    const expiredAt = Date.now() + 1000 * 60 * 60

    await this.linkRepository.create({
      discordId,
      token,
      expiredAt,
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    })

    return response.ok({ token, expiredAt, message: 'Token generated' })
  }

  async verify({ response, request }: HttpContext) {
    const body = await request.validateUsing(verifyValidator)
    const { minecraftUUID, token } = body

    const link = await this.linkRepository.findByToken(token)
    if (!link) {
      return response.badRequest({ message: 'Invalid token' })
    } else if (link.minecraftUUID) {
      return response.badRequest({ message: 'Discord account already linked' })
    }

    const minecraft = await this.linkRepository.findByUUID(minecraftUUID)
    if (minecraft) {
      return response.badRequest({ message: 'Minecraft account already linked' })
    }

    await this.linkRepository.update(link, {
      minecraftUUID,
    })

    return response.ok({ message: 'Minecraft account linked' })
  }
}
