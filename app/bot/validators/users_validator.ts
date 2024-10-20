import vine from '@vinejs/vine'

export const usersValidator = vine.compile(
  vine.object({
    users: vine.number(),
  })
)
