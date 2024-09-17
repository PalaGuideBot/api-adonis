import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { pogXp } from '#utils/contents/pogs'
import { PogRepository } from '#utils/repositories/pogs_repository'
import { calculatePogValidator } from '#utils/validators/calculate_validator'

@inject()
export default class PogsController {
  constructor(private pogRepository: PogRepository) {}

  async calculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(calculatePogValidator)

    if (body.currentXp > pogXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const result = this.pogRepository.getXpPerItemForPog(body)

    return response.ok(result)
  }
}
