import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { JobRepository } from '#utils/repositories/jobs_repository'
import { calculateJobValidator } from '#utils/validators/calculate_validator'

@inject()
export default class JobsController {
  constructor(private jobRepository: JobRepository) {}

  async calculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(calculateJobValidator)

    let result

    if (body.mode === 'standard') {
      result = {
        mode: body.mode,
        result: this.jobRepository.getXpPerItemForJob(body),
      }
    }

    if (body.mode === 'reverse') {
      result = {
        mode: body.mode,
        result: this.jobRepository.calculateXpFromItems(body),
      }
    }

    return response.ok(result)
  }

  async levels({ response }: HttpContext) {
    const levels = this.jobRepository.getLevels()

    if (!levels || levels.length === 0) {
      return response.badRequest({ message: 'No levels found' })
    }

    return response.ok(levels)
  }

  async items({ response }: HttpContext) {
    const items = this.jobRepository.getItems()

    if (!items || items.length === 0) {
      return response.badRequest({ message: 'No items found' })
    }

    return response.ok(items)
  }
}
