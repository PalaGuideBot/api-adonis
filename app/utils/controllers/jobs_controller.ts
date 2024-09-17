import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { jobXp } from '#utils/contents/jobs'
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
    if (body.currentXp > jobXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const result = await this.jobRepository.getXpPerItemForJob(body)

    return response.ok(result)
  }

  async reverseCalculate({ response, request }: HttpContext) {
    const { body } = await request.validateUsing(reverseCalculateJobValidator)

    const types = await this.jobRepository.getItemListing()
    const type = types.find(({ id }) => id === body.item)

    if (!type) {
      return response.badRequest({ message: 'Invalid item' })
    }

    if (body.currentXp > jobXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const result = await this.jobRepository.getXpTotalForItem({
      ...body,
      job: type.job,
    })

    return response.ok(result)
  }

  async items({ response }: HttpContext) {
    const items = await this.jobRepository.getItemListing()

    if (!items || items.length === 0) {
      return response.badRequest({ message: 'No items found' })
    }

    return response.ok(items)
  }
}
