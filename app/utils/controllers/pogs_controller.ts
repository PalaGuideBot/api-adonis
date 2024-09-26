import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { PogRepository } from '#utils/repositories/pogs_repository'
import { calculatePogValidator } from '#utils/validators/calculate_validator'

@inject()
export default class PogsController {
  constructor(private pogRepository: PogRepository) {}

  async calculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(calculatePogValidator)

    const result = this.pogRepository.getXpPerItemForPog(body)

    return response.ok(result)
  }
}
