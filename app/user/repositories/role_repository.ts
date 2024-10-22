import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'

import { db } from '#core/services/db'
import type { createRoleValidator, updateRoleValidator } from '#user/validators/role_validator'

class RoleRepository {
  async findAll() {
    return await db.role.find().lean()
  }

  async findByName(name: string) {
    return await db.role
      .findOne({
        name,
      })
      .lean()
  }

  async findByNames(names: string[]) {
    return await db.role
      .find({
        name: { $in: names },
      })
      .lean()
  }

  async create(data: Infer<typeof createRoleValidator>) {
    if (await db.role.exists({ name: data.name })) {
      throw new Exception('Role already exists', { status: 400 })
    }
    return await db.role.create(data)
  }

  async update(name: string, data: Infer<typeof updateRoleValidator>) {
    if (!(await db.role.exists({ name }))) {
      throw new Exception('Role not found', { status: 404 })
    }
    await db.role.updateOne({ name }, data)
    return await this.findByName(data.name || name)
  }

  async delete(name: string) {
    return await db.role.deleteOne({ name })
  }
}

export { RoleRepository }
