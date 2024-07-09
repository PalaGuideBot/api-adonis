import env from '#start/env'
import ky, { HTTPError } from 'ky'

import type { LeaderboardCategory, LeaderboardTrixiumCategory } from '#paladium/types'
import { factionMembersValidator, factionProfileValidator } from '#paladium/validators/faction'
import {
  factionsLeaderboardValidator,
  leaderboardCategoryValidator,
  trixiumValidators,
} from '#paladium/validators/leaderboard'
import {
  playerAchievementsValidator,
  playerProfileValidator,
  playerRankValidator,
  playerTrixiumRankingValidator,
} from '#paladium/validators/player'
import { statusValidator } from '#paladium/validators/status'
import { Infer } from '@vinejs/vine/types'

class PaladiumService {
  protected client = ky.create({
    prefixUrl: env.get('PALADIUM_BASE_URL'),
    timeout: 10000,
  })

  // PLAYER REQUESTS

  async getPlayerProfile(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}`)
      const data = await response.json()

      return playerProfileValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getPlayerRank(uuid: string) {
    try {
      const response = await this.client.get(`paladium/ranking/position/${uuid}`)
      const data = await response.json()

      return playerRankValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getPlayerTrixiumRank(uuid: string) {
    try {
      const response = await this.client.get(`paladium/ranking/trixium/player/${uuid}`)
      const data = await response.json()

      return playerTrixiumRankingValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getPlayerAchievements(uuid: string) {
    try {
      const response = await this.client.get(
        `paladium/player/profile/${uuid}/achievements?limit=250`
      )
      const data = await response.json()

      return playerAchievementsValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  // FACTION REQUESTS

  async getFactionProfile(name: string) {
    try {
      const response = await this.client.get(`paladium/faction/profile/${name}`)
      const data = await response.json()

      return factionProfileValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getFactionMembers(uuid: string) {
    try {
      const response = await this.client.get(`paladium/faction/profile/${uuid}/players?limit=100`)
      const data = await response.json()

      return factionMembersValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  // LEADERBOARD REQUESTS

  async getLeaderboardFactions() {
    try {
      const response = await this.client.get(`paladium/faction/leaderboard`)
      const data = await response.json()

      return factionsLeaderboardValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getLeaderboardRanking(category: LeaderboardCategory) {
    try {
      let result: Infer<typeof leaderboardCategoryValidator> = []

      for (let i = 0; i < 50; i++) {
        const response = await this.client.get(`paladium/ranking/leaderboard/${category}/${i + 1}`)
        const data = await response.json()

        const validatedData = await leaderboardCategoryValidator.validate(data)
        result = [...result, ...validatedData]
      }

      return result
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }

  async getLeaderboardRankingTrixium<Category extends LeaderboardTrixiumCategory>(
    category: Category
  ) {
    try {
      const result = []
      for (let i = 0; i < 5; i++) {
        const response = await this.client.get(
          `paladium/ranking/trixium/${category}?offset=${i * 100}&limit=100`
        )
        const data = await response.json()

        const validatedData = await trixiumValidators[category].validate(data)
        result.push(...validatedData.data)
      }

      return result as Infer<(typeof trixiumValidators)[Category]>['data']
    } catch (error: unknown) {
      throw errorFormatter(error)
    }
  }

  // STATUS REQUESTS

  async getStatus() {
    try {
      const response = await this.client.get('status')
      const data = await response.json()

      return statusValidator.validate(data)
    } catch (error: unknown) {
      return errorFormatter(error)
    }
  }
}

function errorFormatter(error: any) {
  if (error.code === 'E_VALIDATION_ERROR') {
    return {
      message: 'Model failed to validate the request',
      details: error,
    }
  } else if (error instanceof HTTPError && error.response.status === 404) {
    return {
      message: 'HTTP Error',
      details: error.response.status,
    }
  } else {
    return {
      message: 'An error occurred while processing the request',
      details: error,
    }
  }
}

export { PaladiumService }
