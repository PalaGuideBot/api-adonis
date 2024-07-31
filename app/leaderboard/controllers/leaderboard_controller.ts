import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { categories, config, trixiumCategories } from '#leaderboard/contents/categories'
import { LeaderboardRepository } from '#leaderboard/repositories/leaderboard_repository'

@inject()
export default class LeaderboardController {
  constructor(private leaderboardRepository: LeaderboardRepository) {}

  async showGlobal({ response, params }: HttpContext) {
    const category = params.category

    if (!categories.includes(category)) {
      return response.badRequest({ message: `Category "${category}" not exists`, categories })
    }

    const target = config.find((item) => item.name === category)!

    try {
      const result = await cache.getOrSet({
        key: target.cacheKey,
        factory: () => this.leaderboardRepository.get(target),
      })
      return response.json(result)
    } catch (error: unknown) {
      return response.status(500).send(error)
    }
  }

  async showTrixium({ response, params }: HttpContext) {
    const category = params.category

    if (!trixiumCategories.includes(category)) {
      return response.badRequest({
        message: `Trixium category "${category}" not exists`,
        categories: trixiumCategories,
      })
    }

    const target = config.find((item) => item.name === `trixium.${category}`)!

    try {
      const result = await cache.getOrSet({
        key: target.cacheKey,
        factory: () => this.leaderboardRepository.get(target),
      })
      return response.json(result)
    } catch (error: unknown) {
      return response.status(500).send(error)
    }
  }
}
