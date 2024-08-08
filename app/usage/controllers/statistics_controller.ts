import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { UsageService } from '#usage/services/usage_service'

@inject()
export default class StatisticsController {
  constructor(private usageService: UsageService) {}

  async show({ response }: HttpContext) {
    const result = await cache.getOrSet({
      key: 'usage:statistics',
      factory: () => this.usageService.getStatistics(),
      ttl: 1000 * 60 * 5,
    })

    return response.ok(result)
  }
}
