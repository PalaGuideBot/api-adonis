import { Exception } from '@adonisjs/core/exceptions'
import ky from 'ky'

import cache from '#cache/cache'
import { discordUserValidator } from '#core/validators/discord_validator'
import env from '#start/env'

const client = ky.create({
  prefix: 'https://discord.com/api/v9',
  headers: { Authorization: `Bot ${env.get('DISCORD_API_TOKEN')}`, Accept: 'application/json' },
})

export class DiscordService {
  async getUser(id: string) {
    try {
      return cache.getOrSet({
        key: `discord:user:${id}`,
        factory: async () => {
          const response = await client.get(`users/${id}`)
          const data = await response.json()
          const result = await discordUserValidator.validate(data)

          return {
            id: result.id,
            username: result.global_name || result.username,
            avatarUrl: result.avatar
              ? `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}${result.avatar.startsWith('a_') ? '.gif' : '.png'}`
              : `https://api.dicebear.com/9.x/initials/svg?seed=${result.username}`,
          }
        },
      })
    } catch (error: unknown) {
      throw new Exception('Failed to fetch user from Discord', {
        status: 500,
        code: 'E_DISCORD_FETCH_FAILED',
        cause: error,
      })
    }
  }
}
