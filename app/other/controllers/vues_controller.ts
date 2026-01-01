import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { VuesRepository } from '#other/repositories/vues_repository'
import { vuesIncrementValidator } from '#other/validators/vues_validator'

@inject()
export default class VuesController {
  constructor(private vuesRepository: VuesRepository) {}

  async increment({ request, response }: HttpContext) {
    const payload = await request.validateUsing(vuesIncrementValidator)
    const result = await this.vuesRepository.increment(payload)

    if (!result) {
      return response.notFound({ message: 'Player not found' })
    }

    return response.ok(result)
  }

  async show({ params, response }: HttpContext) {
    const result = await this.vuesRepository.get({ uuid: params.uuid })

    if (!result) {
      return response.notFound({ message: 'Player not found' })
    }

    return response.ok(result)
  }
}
