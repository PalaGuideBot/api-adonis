import vine from '@vinejs/vine'

import { existsInRule } from '#core/validators/rules/exists_in'

const rolesValidator = vine.array(
  vine.string().use(existsInRule({ model: 'role', column: 'name' }))
)

export const createUserValidator = vine.compile(
  vine.object({
    discordId: vine.string(),
    username: vine.string(),
    avatarUrl: vine.string(),
    roles: rolesValidator.clone(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    discordId: vine.string().optional(),
    username: vine.string().optional(),
    avatarUrl: vine.string().optional(),
    roles: rolesValidator.clone().optional(),
  })
)

export const updateUserRolesValidator = vine.compile(vine.object({ roles: rolesValidator.clone() }))
