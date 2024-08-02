import vine from '@vinejs/vine'

export const tokenValidator = vine.compile(
  vine.object({
    discordId: vine.string(),
  })
)

export const verifyValidator = vine.compile(
  vine.object({
    minecraftUUID: vine.string(),
    token: vine.string(),
  })
)
