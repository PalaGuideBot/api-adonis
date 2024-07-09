import vine from '@vinejs/vine'

export const minecraftUserProfileValidator = vine.compile(
  vine.object({
    name: vine.string(),
    id: vine.string(),
  })
)
