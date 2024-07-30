import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { HomeRepository } from '#other/repository/home_repository'

@inject()
export default class HomeController {
  constructor(private homeRepository: HomeRepository) {}

  async show({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'home',
        factory: () => this.homeRepository.get(),
      })
      return response.json(result)
    } catch (error: unknown) {
      return response.status(500).send(error)
    }
  }
}
