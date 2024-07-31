import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { StatusRepository } from '#other/repository/status_repository'

@inject()
export default class StatusController {
  constructor(private statusRepository: StatusRepository) {}

  async show({ response }: HttpContext) {
    const result = await cache.getOrSet({
      key: 'status',
      factory: () => this.statusRepository.findAll(),
    })

    return response.ok(result)
  }
}
