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
    const { job, currentLevel, targetLevel, bonusXp, currentXp } = body

    if (currentXp > jobXp[currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const responses = await this.jobRepository.xpPerItemForJob(
      job,
      currentLevel,
      targetLevel,
      bonusXp,
      currentXp
    )

    return response.ok(responses)
  }

  async reverseCalculate({ response, request }: HttpContext) {
    const body = await request.validateUsing(reverseCalculateJobValidator)
    const { item, currentLevel, bonusXp, currentXp, amount } = body

    const types = await this.jobRepository.itemListing()
    const typesFind = types.find(({ id }) => id === item)

    if (!typesFind) {
      return response.badRequest({ message: 'Invalid item' })
    }

    if (currentXp > jobXp[currentLevel]) {
      return response.badRequest({ message: 'Invalid current xp' })
    }

    const responses = await this.jobRepository.xpTotalForItem(
      typesFind.job,
      item,
      currentLevel,
      bonusXp,
      currentXp,
      amount
    )

    return response.ok(responses)
  }

  async itemListing({ response }: HttpContext) {
    const responses = await this.jobRepository.itemListing()
    if (!responses || responses.length === 0) {
      return response.badRequest({ message: 'No items found' })
    }

    return response.ok(responses)
  }
}
