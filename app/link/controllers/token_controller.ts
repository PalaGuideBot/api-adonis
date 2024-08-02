import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { tokenValidator, verifyValidator } from '../validators/token_validator.js'
import { TokenRepository } from '../repositories/token_repository.js'

@inject()
export default class TokenController {
  constructor(private tokenRepository: TokenRepository) {}

  async generate({ response, request }: HttpContext) {
    const body = await request.validateUsing(tokenValidator)
    const { discordId } = body

    const hasLink = await this.tokenRepository.findByDiscordId(discordId)
    if (hasLink && hasLink.minecraftUUID) {
      return response.badRequest({ message: 'Discord account already linked' })
    } else if (hasLink && !hasLink.minecraftUUID) {
      return response.ok({ token: hasLink.token, expiredAt: hasLink.expiredAt })
    }

    const token = await this.tokenRepository.generateToken()
    const expiredAt = Date.now() + 1000 * 60 * 60

    await this.tokenRepository.create({
      discordId,
      token,
      expiredAt,
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    })

    return response.ok({ token, expiredAt })
  }

  async verify({ response, request }: HttpContext) {
    const body = await request.validateUsing(verifyValidator)
    const { minecraftUUID, token } = body

    const hasLink = await this.tokenRepository.findByToken(token)
    if (!hasLink) {
      return response.badRequest({ message: 'Invalid token' })
    } else if (hasLink.minecraftUUID) {
      return response.badRequest({ message: 'Discord account already linked' })
    }

    const hasMinecraftUUID = await this.tokenRepository.findByMinecraftUUID(minecraftUUID)
    if (hasMinecraftUUID) {
      return response.badRequest({ message: 'Minecraft account already linked' })
    }

    await this.tokenRepository.update(hasLink, {
      minecraftUUID,
    })

    return response.ok({ message: 'Minecraft account linked' })
  }
}
