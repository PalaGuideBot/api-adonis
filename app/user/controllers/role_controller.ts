import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { RoleRepository } from '#user/repositories/role_repository'
import { createRoleValidator, updateRoleValidator } from '#user/validators/role_validator'

@inject()
export default class RoleController {
  constructor(private roleRepository: RoleRepository) {}

  async index({ response }: HttpContext) {
    const roles = await this.roleRepository.findAll()
    return response.ok(roles)
  }

  async show({ response, params }: HttpContext) {
    const role = await this.roleRepository.findByName(params.name)

    if (!role) {
      return response.notFound({ message: 'Role not found' })
    }

    return response.ok(role)
  }

  async create({ response, request }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)

    const role = await this.roleRepository.create(data)
    return response.created(role)
  }

  async update({ response, request, params }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator)
    const role = await this.roleRepository.update(params.name, data)

    return response.ok(role)
  }

  async delete({ response, params }: HttpContext) {
    const role = await this.roleRepository.findByName(params.name)

    if (!role) {
      return response.notFound({ message: 'Role not found' })
    }

    await this.roleRepository.delete(role.name)

    return response.noContent()
  }
}
