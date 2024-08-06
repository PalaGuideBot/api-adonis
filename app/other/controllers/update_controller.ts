import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { UpdateRepository } from '#other/repositories/update_repository'

@inject()
export default class UpdateController {
  constructor(private updateRepository: UpdateRepository) {}

  async show({ response }: HttpContext) {
    const update = await this.updateRepository.updateObject()

    return response.ok(update)
  }
}
