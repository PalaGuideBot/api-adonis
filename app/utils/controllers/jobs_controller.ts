import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import {
  calculateJobValidator,
  reverseCalculateJobValidator,
} from '#utils/validators/calculate_validator'
import { jobXp } from '#utils/contents/jobs'
import { JobRepository } from '#utils/repositories/jobs_repository'

@inject()
export default class JobsController {
  constructor(private jobRepository: JobRepository) {}

  async calculate({ response, request }: HttpContext) {
    const body = await request.validateUsing(calculateJobValidator)
    if (body.currentXp > jobXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const responses = await this.jobRepository.getXpPerItemForJob(body)

    return response.ok(responses)
  }

  async reverseCalculate({ response, request }: HttpContext) {
    const body = await request.validateUsing(reverseCalculateJobValidator)

    const types = await this.jobRepository.getItemListing()
    const typesFind = types.find(({ id }) => id === body.item)

    if (!typesFind) {
      return response.badRequest({ message: 'Invalid item' })
    }

    if (body.currentXp > jobXp[body.currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const responses = await this.jobRepository.getXpTotalForItem({
      ...body,
      job: typesFind.job,
    })

    return response.ok(responses)
  }

  async itemListing({ response }: HttpContext) {
    const responses = await this.jobRepository.getItemListing()
    if (!responses || responses.length === 0) {
      return response.badRequest({ message: 'No items found' })
    }

    return response.ok(responses)
  }
}
