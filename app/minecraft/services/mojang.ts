import { Exception } from '@adonisjs/core/exceptions'
import ky from 'ky'

import { formatUUID } from '#core/helpers'
import { minecraftUserProfileValidator } from '#minecraft/validators/mojang_validator'
import env from '#start/env'

class MojangService {
  protected client = ky.create({
    prefixUrl: env.get('MOJANG_API_URL'),
    timeout: false,
  })

  async getUUIDByUsername(username: string) {
    try {
      const response = await this.client.get(`users/profiles/minecraft/${username}`)
      const data = await response.json()

      const result = await minecraftUserProfileValidator.validate(data)
      return formatUUID(result.id)
    } catch (error: unknown) {
      throw new Exception('Player not found', { status: 404, code: 'E_MOJANG_PLAYER_NOT_FOUND' })
    }
  }
}

export { MojangService }
