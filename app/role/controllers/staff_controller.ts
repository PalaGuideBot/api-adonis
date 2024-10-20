import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { StaffRepository } from '#role/repositories/staff_repository'

@inject()
export default class StaffController {
  constructor(private staffRepository: StaffRepository) {}

  async show({ response }: HttpContext) {
    const staff = await this.staffRepository.list()

    return response.ok(staff)
  }

  async add({ response, params }: HttpContext) {
    const staffExists = await this.staffRepository.find(params.discordId)
    if (staffExists) {
      return response.badRequest({ message: 'Staff already exists' })
    }

    await this.staffRepository.create(params.discordId)
  }

  async delete({ response, params }: HttpContext) {
    const staffExists = await this.staffRepository.find(params.discordId)
    if (!staffExists) {
      return response.badRequest({ message: 'Staff does not exist' })
    }

    await this.staffRepository.delete(params.discordId)
  }
}
