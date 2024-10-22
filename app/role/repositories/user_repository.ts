import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'

import { db } from '#core/services/db'
import { RoleRepository } from '#role/repositories/role_repository'
import type { createUserValidator, updateUserValidator } from '#role/validators/user_validator'

@inject()
class UserRepository {
  constructor(private roleRepository: RoleRepository) {}

  async findAll() {
    const users = await db.user.find().lean()
    const roles = await this.roleRepository.findAll()

    return users.map((user) => ({
      ...user,
      roles: roles.filter((role) => user.roles.includes(role.name)).map(({ _id, ...role }) => role),
    }))
  }

  async findById(id: string) {
    const user = await db.user
      .findOne({
        discordId: id,
      })
      .lean()

    if (user) {
      return { ...user, roles: await this.transformRoles(user.roles) }
    }

    return null
  }

  async create(data: Infer<typeof createUserValidator>) {
    if (await db.user.exists({ discordId: data.discordId })) {
      throw new Exception('User already exists', { status: 400 })
    }
    const user = await db.user.create(data)
    return { ...user, roles: await this.transformRoles(user.roles) }
  }

  async update(id: string, data: Infer<typeof updateUserValidator>) {
    if (!(await db.user.exists({ discordId: id }))) {
      throw new Exception('User not found', { status: 404 })
    }
    await db.user.updateOne({ discordId: id }, data)
    return await this.findById(data.discordId || id)
  }

  async addRoles(id: string, roles: string[]) {
    const user = await db.user.findOne({ discordId: id })
    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }
    const newRoles = [...new Set([...user.roles, ...roles])]
    await db.user.updateOne({ discordId: id }, { roles: newRoles })
    return await this.findById(id)
  }

  async removeRoles(id: string, roles: string[]) {
    const user = await db.user.findOne({ discordId: id })
    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }
    const newRoles = user.roles.filter((role) => !roles.includes(role))
    await db.user.updateOne({ discordId: id }, { roles: newRoles })
    return await this.findById(id)
  }

  async delete(id: string) {
    return await db.user.deleteOne({ discordId: id })
  }

  protected async transformRoles(roles: string[]) {
    if (roles.length === 0) {
      return []
    }
    const result = await this.roleRepository.findByNames(roles)
    return result.map(({ _id, ...role }) => role)
  }
}

export { UserRepository }
