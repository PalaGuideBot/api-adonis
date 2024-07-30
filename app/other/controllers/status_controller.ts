import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { StatusRepository } from '#other/repository/status_repository'

@inject()
export default class StatusController {
  constructor(private statusRepository: StatusRepository) {}

  async show({ response }: HttpContext) {
    try {
      const result = await cache.getOrSet({
        key: 'status',
        factory: () => this.statusRepository.get(),
      })
      return response.json(result)
    } catch (error: unknown) {
      return response.status(500).send(error)
    }
  }
}
