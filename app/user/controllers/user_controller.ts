import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { UserRepository } from '#user/repositories/user_repository'
import {
  createUserValidator,
  updateUserRolesValidator,
  updateUserValidator,
} from '#user/validators/user_validator'

@inject()
export default class UserController {
  constructor(private userRepository: UserRepository) {}

  async index({ response }: HttpContext) {
    const users = await this.userRepository.findAll()
    return response.ok(users)
  }

  async show({ response, params }: HttpContext) {
    const user = await this.userRepository.findById(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.ok(user)
  }

  async create({ response, request }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const user = await this.userRepository.create(data)
    return response.created(user)
  }

  async update({ response, request, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator)
    const user = await this.userRepository.update(params.id, data)

    return response.ok(user)
  }

  async addRoles({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateUserRolesValidator)
    const user = await this.userRepository.addRoles(params.id, data.roles)

    return response.ok(user)
  }

  async removeRoles({ response, params, request }: HttpContext) {
    const data = await request.validateUsing(updateUserRolesValidator)
    const user = await this.userRepository.removeRoles(params.id, data.roles)

    return response.ok(user)
  }

  async delete({ response, params }: HttpContext) {
    const user = await this.userRepository.findById(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    await this.userRepository.delete(user.discordId)

    return response.noContent()
  }
}
