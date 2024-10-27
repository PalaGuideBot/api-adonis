import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().toUpperCase().trim(),
    label: vine.string().trim(),
    priority: vine.number().positive(),
    description: vine.string(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().toUpperCase().trim().optional(),
    label: vine.string().trim().optional(),
    priority: vine.number().positive().optional(),
    description: vine.string().optional(),
  })
)
