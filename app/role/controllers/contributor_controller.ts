import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ContributorRepository } from '#role/repositories/contributor_repository'

@inject()
export default class StaffController {
  constructor(private contributorRepository: ContributorRepository) {}

  async show({ response }: HttpContext) {
    const contributor = await this.contributorRepository.list()

    return response.ok(contributor)
  }

  async add({ response, params }: HttpContext) {
    const contributorExists = await this.contributorRepository.find(params.discordId)
    if (contributorExists) {
      return response.badRequest({ message: 'Contributor already exists' })
    }

    await this.contributorRepository.create(params.discordId)
  }

  async delete({ response, params }: HttpContext) {
    const contributorExists = await this.contributorRepository.find(params.discordId)
    if (!contributorExists) {
      return response.badRequest({ message: 'Contributor does not exist' })
    }

    await this.contributorRepository.delete(params.discordId)
  }
}
