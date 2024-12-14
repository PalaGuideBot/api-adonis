import vine from '@vinejs/vine'

export const discordUserValidator = vine.compile(
  vine.object({
    id: vine.string(),
    username: vine.string(),
    avatar: vine.string().optional().nullable(),
    global_name: vine.string().nullable(),
  })
)
