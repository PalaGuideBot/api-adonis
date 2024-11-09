import vine from '@vinejs/vine'

export const discordUserValidator = vine.compile(
  vine.object({
    id: vine.string(),
    username: vine.string(),
    avatar: vine.string(),
    global_name: vine.string().nullable(),
  })
)
