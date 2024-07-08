import ky, { HTTPError } from 'ky'
import env from '#start/env'
import { playerNameToUuidValidator } from '../validators/paladium/player_name_to_uuid.js'
import {
  playerProfileValidator,
  playerRankValidator,
  playerTrixiumRankingValidator,
  playerAchievementsValidator,
} from '../validators/paladium/player.js'

import { factionProfileValidator, factionMembersValidator } from '../validators/paladium/faction.js'

import {
  factionsLeaderboardValidator,
  leaderboardCategoryValidator,
  leaderboardTrixiumPlayersValidator,
  leaderboardTrixiumFactionsValidator,
} from '../validators/paladium/leaderboard.js'

import { statusValidator } from '../validators/paladium/status.js'

const paladiumClient = ky.create({
  prefixUrl: env.get('PALADIUM_BASE_URL'),
  timeout: 10000,
})

const mojangClient = ky.create({
  prefixUrl: env.get('MOJANG_API_URL'),
})

export class PaladiumApi {
  // MOJANG REQUESt

  async playerNameToUUID(username: string) {
    try {
      const response = await mojangClient.get(`users/profiles/minecraft/${username}`)
      const data = (await response.json()) as Record<string, string>

      await playerNameToUuidValidator.validate(data)

      return data.id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  // PALADIUM REQUEST

  // PLAYER REQUEST

  async getPlayerProfile(uuid: string) {
    try {
      const response = await paladiumClient.get('/paladium/player/profile/' + uuid)
      const data = (await response.json()) as Record<string, string>

      await playerProfileValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  async getPlayerRank(uuid: string) {
    try {
      const response = await paladiumClient.get('/paladium/ranking/position/' + uuid)
      const data = (await response.json()) as Record<string, string>

      await playerRankValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  async getPlayerTrixium(uuid: string) {
    try {
      const response = await paladiumClient.get('/paladium/ranking/trixium/player/' + uuid)
      const data = (await response.json()) as Record<string, string>

      await playerTrixiumRankingValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  async getPlayerAchievements(uuid: string) {
    try {
      const response = await paladiumClient.get(
        '/paladium/player/profile/' + uuid + '/achievements?limit=250'
      )
      const data = (await response.json()) as Record<string, string>

      await playerAchievementsValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  // FACTION REQUEST

  async getFactionProfile(name: string) {
    try {
      const response = await paladiumClient.get('/paladium/faction/profile/' + name)
      const data = (await response.json()) as Record<string, string>

      await factionProfileValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Faction not found')
      }
    }
  }

  async getFactionMembers(uuid: string) {
    try {
      const response = await paladiumClient.get(
        '/paladium/faction/profile/' + uuid + '/players?limit=100'
      )
      const data = (await response.json()) as Record<string, string>

      await factionMembersValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Faction not found')
      }
    }
  }

  // LEADERBOARD REQUEST

  async getFactionsLeaderboard() {
    try {
      const response = await paladiumClient.get('/paladium/faction/leaderboard')
      const data = (await response.json()) as Record<string, string>

      await factionsLeaderboardValidator.validate(data)

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Leaderboard not found')
      }
    }
  }

  async getRankingCategory(category: string) {
    try {
      const value = []
      for (let i = 0; i < 50; i++) {
        const response = await paladiumClient.get(
          '/paladium/ranking/leaderboard/' + category + '/' + (i + 1)
        )
        const data = (await response.json()) as Record<string, string>

        await leaderboardCategoryValidator.validate(data)

        value.push(data)
      }

      return value
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Leaderboard not found')
      }
    }
  }

  async getRankingTrixium(category: string) {
    try {
      const value = []
      for (let i = 0; i < 5; i++) {
        const response = await paladiumClient.get(
          '/paladium/ranking/trixium/' + category + '?offset=' + i * 100 + '&limit=100'
        )
        const data = (await response.json()) as Record<string, string>

        if (category === 'players') await leaderboardTrixiumPlayersValidator.validate(data)
        else await leaderboardTrixiumFactionsValidator.validate(data)

        value.push(data)
      }

      return value
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Leaderboard not found')
      }
    }
  }

  // STATUS REQUEST

  async getStatus() {
    try {
      const response = await paladiumClient.get('/status')
      const data = (await response.json()) as Record<string, string>

      await statusValidator.validate(data)
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Status not found')
      }
    }
  }
}
