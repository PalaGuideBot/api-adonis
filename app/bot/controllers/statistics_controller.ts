import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { BotRepository } from '#bot/repository/bot_repository'

@inject()
export default class StatisticsController {
  constructor(private botRepository: BotRepository) {}

  async index({ response }: HttpContext) {
    const result = await cache.getOrSet({
      key: 'bot:statistics',
      factory: () => this.botRepository.findStatistics(),
    })

    return response.ok(result)
  }
}
