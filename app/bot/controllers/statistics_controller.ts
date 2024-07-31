import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { BotRepository } from '#bot/repositories/bot_repository'
import cache from '#cache/cache'

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
