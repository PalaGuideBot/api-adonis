import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { calculatePogValidator } from '#utils/validators/calculate_validator'
import { pogXp } from '#utils/contents/pogs'
import { PogRepository } from '#utils/repositories/pogs_repository'

@inject()
export default class PogsController {
  constructor(private pogRepository: PogRepository) {}

  async calculate({ response, request }: HttpContext) {
    const bodyJSON = request.all()
    const body = await calculatePogValidator.validate(bodyJSON.body)
    if (body.currentXp > pogXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const responses = await this.pogRepository.getXpPerItemForPog(body)

    return response.ok(responses)
  }
}
