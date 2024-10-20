import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { JobRepository } from '#utils/repositories/jobs_repository'
import {
  calculateJobValidator,
  reverseCalculateJobValidator,
} from '#utils/validators/calculate_validator'

@inject()
export default class JobsController {
  constructor(private jobRepository: JobRepository) {}

  async calculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(calculateJobValidator)

    const result = this.jobRepository.getXpPerItemForJob(body)

    return response.ok(result)
  }

  async reverseCalculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(reverseCalculateJobValidator)

    const types = this.jobRepository.getItems()
    const type = types.find(({ id }) => id === body.item)

    if (!type) {
      return response.badRequest({ message: 'Invalid item' })
    }

    const result = this.jobRepository.getXpTotalForItem({
      ...body,
      job: type.job,
    })

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
