import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { PogRepository } from '#utils/repositories/pog_repository'
import { calculatePogValidator } from '#utils/validators/calculate_validator'

@inject()
export default class PogController {
  constructor(private pogRepository: PogRepository) {}

  async items({ response }: HttpContext) {
    const items = this.pogRepository.getItems()

    return response.ok(items)
  }

  async calculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(calculatePogValidator)

    const result = this.pogRepository.calculate(body)

    return response.ok(result)
  }
}
