import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { StatisticsRepository } from '#usage/repositories/statistics_repository'
import cache from '#cache/cache'

@inject()
export default class StatisticsController {
  constructor(private statisticsRepository: StatisticsRepository) {}

  async show({ response }: HttpContext) {
    const result = await cache.getOrSet({
      key: 'usage:statistics',
      factory: () => this.statisticsRepository.findStatistics(),
    })

    return response.ok(result)
  }
}
