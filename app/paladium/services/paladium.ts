import ky, { HTTPError } from 'ky'
import env from '#start/env'
import { playerNameToUuidValidator } from '../validators/player_name_to_uuid.js'
import {
  playerProfileValidator,
  playerRankValidator,
  playerTrixiumRankingValidator,
  playerAchievementsValidator,
} from '../validators/player.js'

import { factionProfileValidator, factionMembersValidator } from '../validators/faction.js'

import {
  factionsLeaderboardValidator,
  leaderboardCategoryValidator,
  leaderboardTrixiumPlayersValidator,
  leaderboardTrixiumFactionsValidator,
} from '../validators/leaderboard.js'

import { statusValidator } from '../validators/status.js'

const paladiumClient = ky.create({
  prefixUrl: env.get('PALADIUM_BASE_URL'),
  timeout: 10000,
})

const mojangClient = ky.create({
  prefixUrl: env.get('MOJANG_API_URL'),
})

async function errorFormatter(e: any) {
  if (e.code === 'E_VALIDATION_ERROR') {
    return {
      message: 'Model failed to validate the request',
      details: e,
    }
  } else if (e instanceof HTTPError && e.response.status === 404) {
    return {
      message: 'HTTP Error',
      details: e.response.status,
    }
  } else {
    return {
      message: 'An error occurred while processing the request',
      details: e,
    }
  }
}

export class PaladiumAPI {
  // MOJANG REQUESt

  async getPlayerNameToUUID(username: string) {
    try {
      const response = await mojangClient.get(`users/profiles/minecraft/${username}`)
      const data = (await response.json()) as Record<string, string>

      const dataType = await playerNameToUuidValidator.validate(data)

      return dataType.id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
    } catch (e) {
      return errorFormatter(e)
    }
  }

  // PALADIUM REQUEST

  // PLAYER REQUEST

  async getPlayerProfile(uuid: string) {
    try {
      const response = await paladiumClient.get(`paladium/player/profile/${uuid}`)
      const data = (await response.json()) as Record<string, string>

      const dataType = await playerProfileValidator.validate(data)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getPlayerRank(uuid: string) {
    try {
      const response = await paladiumClient.get(`paladium/ranking/position/${uuid}`)
      const data = (await response.json()) as Record<string, string>

      const modifiedData: Record<string, string> = {}
      for (const key in data) {
        if (key.includes('-')) modifiedData[key.replace(/-/g, '_')] = data[key]
        else modifiedData[key] = data[key]
      }

      const dataType = await playerRankValidator.validate(modifiedData)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getPlayerTrixium(uuid: string) {
    try {
      const response = await paladiumClient.get(`paladium/ranking/trixium/player/${uuid}`)
      const data = (await response.json()) as Record<string, string>

      const dataType = await playerTrixiumRankingValidator.validate(data)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getPlayerAchievements(uuid: string) {
    try {
      const response = await paladiumClient.get(
        `paladium/player/profile/${uuid}/achievements?limit=250`
      )
      const data = (await response.json()) as Record<string, string>

      const dataType = await playerAchievementsValidator.validate(data)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  // FACTION REQUEST

  async getFactionProfile(name: string) {
    try {
      const response = await paladiumClient.get(`paladium/faction/profile/${name}`)
      const data = (await response.json()) as Record<string, any>

      if (data.emblem) {
        const newEmblem = Object.values(data.emblem)
        data.emblem = newEmblem
      }

      const dataType = await factionProfileValidator.validate(data)

      console.log(dataType)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getFactionMembers(uuid: string) {
    try {
      const response = await paladiumClient.get(
        `paladium/faction/profile/${uuid}/players?limit=100`
      )
      const data = (await response.json()) as Record<string, string>

      const dataType = await factionMembersValidator.validate(data)

      return dataType
    } catch (e: any) {
      return errorFormatter(e)
    }
  }

  // LEADERBOARD REQUEST

  async getFactionsLeaderboard() {
    try {
      const response = await paladiumClient.get(`paladium/faction/leaderboard`)
      const data = (await response.json()) as Record<string, string>

      const dataType = await factionsLeaderboardValidator.validate(data)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getRankingCategory(category: string) {
    try {
      const value = []
      for (let i = 0; i < 50; i++) {
        const response = await paladiumClient.get(
          `paladium/ranking/leaderboard/${category}/${i + 1}`
        )
        const data = (await response.json()) as Record<string, string>

        const dataType = await leaderboardCategoryValidator.validate(data)

        value.push(dataType)
      }

      return value
    } catch (e) {
      return errorFormatter(e)
    }
  }

  async getRankingTrixium(category: string) {
    try {
      const value = []
      for (let i = 0; i < 5; i++) {
        const response = await paladiumClient.get(
          `paladium/ranking/trixium/${category}?offset=${i * 100}&limit=100`
        )
        const data = (await response.json()) as Record<string, string>

        const dataType =
          category === 'player'
            ? await leaderboardTrixiumPlayersValidator.validate(data)
            : await leaderboardTrixiumFactionsValidator.validate(data)

        value.push(...dataType.data)
      }

      return value
    } catch (e) {
      return errorFormatter(e)
    }
  }

  // STATUS REQUEST

  async getStatus() {
    try {
      const response = await paladiumClient.get('status')
      const data = (await response.json()) as Record<string, string>

      const dataType = await statusValidator.validate(data)

      return dataType
    } catch (e) {
      return errorFormatter(e)
    }
  }
}
