import { Exception } from '@adonisjs/core/exceptions'
import { errors } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import ky, { HTTPError } from 'ky'

import { LeaderboardCategory, LeaderboardTrixiumCategory } from '#leaderboard/types'
import { calculateBuildingProduction } from '#paladium/helpers/clicker'
import type { ApiResponseError } from '#paladium/types'
import {
  factionMembersValidator,
  factionProfileValidator,
  factionQuestValidator,
} from '#paladium/validators/faction'
import {
  factionsLeaderboardValidator,
  leaderboardCategoryValidator,
  trixiumValidators,
} from '#paladium/validators/leaderboard'
import {
  playerAchievementsValidator,
  playerClickerValidator,
  playerFriendsValidator,
  playerJobsValidator,
  playerMountValidator,
  playerPetValidator,
  playerProfileValidator,
  playerRankValidator,
  playerTrixiumRankingValidator,
} from '#paladium/validators/player'
import { statusValidator } from '#paladium/validators/status'
import env from '#start/env'

class PaladiumService {
  protected client = ky.create({
    prefixUrl: env.get('PALADIUM_BASE_URL'),
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${env.get('PALADIUM_API_KEY')}`,
    },
  })

  // PLAYER REQUESTS

  async getPlayerProfile(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}`)
      const data = await response.json()

      return playerProfileValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getPlayerJobs(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}/jobs`)
      const data = await response.json()

      return playerJobsValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getPlayerRank(uuid: string) {
    try {
      const response = await this.client.get(`paladium/ranking/position/${uuid}`)
      const data = await response.json()

      return playerRankValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getPlayerTrixiumRank(uuid: string) {
    try {
      const response = await this.client.get(`paladium/ranking/trixium/player/${uuid}`)
      const data = await response.json()

      return playerTrixiumRankingValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
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
      throw await buildError(error)
    }
  }

  async getPlayerFriends(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}/friends`)
      const data = await response.json()

      return playerFriendsValidator.validate(data)
    } catch (error: unknown) {
      return {
        data: [],
        totalCount: 0,
      }
    }
  }

  async getPlayerClicker(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}/clicker`)
      const data = await response.json()

      return playerClickerValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getPlayerPet(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}/pet`)
      const data = await response.json()

      return playerPetValidator.validate(data)
    } catch (error: unknown) {
      return null // Pet is not required
    }
  }

  async getPlayerMount(uuid: string) {
    try {
      const response = await this.client.get(`paladium/player/profile/${uuid}/mount`)
      const data = await response.json()

      return playerMountValidator.validate(data)
    } catch (error: unknown) {
      return null // Mount is not required
    }
  }

  async getAllPlayerData(uuid: string) {
    const profile = await this.getPlayerProfile(uuid)
    const jobs = await this.getPlayerJobs(uuid)
    const ranks = await this.getPlayerRank(uuid)
    const trixiumRank = await this.getPlayerTrixiumRank(uuid)
    const achievements = await this.getPlayerAchievements(uuid)
    const friends = await this.getPlayerFriends(uuid)
    const pet = await this.getPlayerPet(uuid)
    const mount = await this.getPlayerMount(uuid)
    const clicker = await this.getPlayerClicker(uuid)

    const clickerProduction = clicker.buildings.reduce(
      (acc, building) => acc + building.production,
      0
    )

    let rps = 0.5

    clicker.buildings.forEach((building) => {
      if (building.quantity > 0) {
        rps += calculateBuildingProduction(building.name, clicker, jobs) * building.quantity
      }
    })

    if (Number.isNaN(rps)) {
      rps = 0
    }

    return {
      profile,
      jobs,
      ranks: { ...ranks, trixium: trixiumRank.position },
      achievements: achievements.data.reduce(
        (acc, achievement) => {
          if (achievement.completed) acc.completed++
          else acc.incomplete++
          acc.total++
          return acc
        },
        {
          completed: 0,
          incomplete: 0,
          total: 0,
        }
      ),
      friends: friends.data.map((friend) => ({
        uuid: friend.uuid,
        username: friend.name,
        rank: friend.rank,
      })),
      pet,
      mount: mount?.mountType !== 0 ? mount : null,
      clicker: {
        rps,
        production: clickerProduction,
      },
    }
  }

  // FACTION REQUESTS

  async getFactionProfile(name: string) {
    try {
      const response = await this.client.get(`paladium/faction/profile/${name}`)
      const data = await response.json()

      return factionProfileValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getFactionMembers(uuid: string) {
    try {
      const response = await this.client.get(`paladium/faction/profile/${uuid}/players?limit=100`)
      const data = await response.json()

      return factionMembersValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getFactionQuest() {
    try {
      const response = await this.client.get('paladium/faction/quest')
      const data = await response.json()

      return factionQuestValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getAllFactionData(name: string) {
    const profile = await this.getFactionProfile(name)
    const members = await this.getFactionMembers(profile.uuid)

    return { ...profile, members }
  }

  // LEADERBOARD REQUESTS

  async getLeaderboardFactions() {
    try {
      const response = await this.client.get(`paladium/faction/leaderboard`)
      const data = await response.json()

      const validate = await factionsLeaderboardValidator.validate(data)

      return validate.map((faction) => ({
        name: faction.name,
        value: faction.elo,
      }))
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }

  async getLeaderboardRankingGlobal(category: LeaderboardCategory) {
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
      throw await buildError(error)
    }
  }

  async getLeaderboardRankingTrixium<Category extends LeaderboardTrixiumCategory>(
    category: Category
  ): Promise<Infer<(typeof trixiumValidators)[Category]>['data']> {
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
      throw await buildError(error)
    }
  }

  async getLeaderboardRanking(
    category: `trixium.${LeaderboardTrixiumCategory}`
  ): Promise<Awaited<ReturnType<this['getLeaderboardRankingTrixium']>>>
  async getLeaderboardRanking(
    category: LeaderboardCategory
  ): Promise<Awaited<ReturnType<this['getLeaderboardRankingGlobal']>>>
  async getLeaderboardRanking(
    category: LeaderboardCategory | `trixium.${LeaderboardTrixiumCategory}`
  ): Promise<
    | Infer<(typeof trixiumValidators)[LeaderboardTrixiumCategory]>['data']
    | Infer<typeof leaderboardCategoryValidator>
  >
  async getLeaderboardRanking(
    category: LeaderboardCategory | `trixium.${LeaderboardTrixiumCategory}`
  ) {
    if (category.startsWith('trixium')) {
      return this.getLeaderboardRankingTrixium(
        category.replace('trixium.', '') as LeaderboardTrixiumCategory
      )
    }
    return this.getLeaderboardRankingGlobal(category as LeaderboardCategory)
  }

  // STATUS REQUESTS

  async getStatus() {
    try {
      const response = await this.client.get('status')
      const data = await response.json()

      return statusValidator.validate(data)
    } catch (error: unknown) {
      throw await buildError(error)
    }
  }
}

async function buildError(error: unknown) {
  if (error instanceof HTTPError) {
    const data = (await error.response.json()) as ApiResponseError
    return new Exception(data.message ?? 'An error occurred while processing the request', {
      status: error.response.status,
      code: data.type ?? 'E_PALADIUM_API_ERROR',
    })
  }
  if (error instanceof errors.E_VALIDATION_ERROR) {
    return new Exception('Unable to validate data', {
      code: 'E_PALADIUM_API_VALIDATION_ERROR',
      status: 500,
    })
  }
  return new Exception('Internal error', {
    code: 'E_PALADIUM_ERROR',
    status: 500,
  })
}

export { PaladiumService }
