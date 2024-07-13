import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
export default class LeaderboardController {
  constructor(private paladium: PaladiumService) {}

  async factions({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'leaderboard:factions',
        factory: () => this.paladium.getLeaderboardFactions(),
      })
      response.json(result)
    } catch (error: unknown) {
      response.status(500).send(error)
    }
  }

  async money({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'leaderboard:money',
        factory: () => this.paladium.getLeaderboardRankingGlobal('money'),
      })
      response.json(result)
    } catch (error: unknown) {
      response.status(500).send(error)
    }
  }

  async trixiumPlayers({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'leaderboard:trixium:players',
        factory: () => this.paladium.getLeaderboardRankingTrixium('player'),
      })
      response.json(result)
    } catch (error: unknown) {
      response.status(500).send(error)
    }
  }

  async trixiumFactions({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'leaderboard:trixium:factions',
        factory: async () => this.paladium.getLeaderboardRankingTrixium('faction'),
      })
      response.json(result)
    } catch (error: unknown) {
      response.status(500).send(error)
    }
  }
}
