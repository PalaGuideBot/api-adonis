import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import mongoose from 'mongoose'

import cache from '#cache/cache'
import { status as databaseStatus } from '#status/contents/database_status'
import { StatusRepository } from '#status/repositories/status_repository'

@inject()
export default class StatusController {
  constructor(private statusRepository: StatusRepository) {}

  async paladium({ response }: HttpContext) {
    const result = await cache.getOrSet({
      key: 'status:paladium',
      factory: () => this.statusRepository.findAll(),
      ttl: 1000 * 60 * 10,
    })

    return response.ok(result)
  }

  database({ response }: HttpContext) {
    const status = databaseStatus[mongoose.connection.readyState]

    if (status === 'connected') {
      return response.ok({ message: status })
    } else {
      return response.badRequest({ message: status })
    }
  }
}
