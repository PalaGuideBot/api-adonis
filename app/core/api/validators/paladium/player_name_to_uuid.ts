import vine from '@vinejs/vine'

export const playerNameToUuidValidator = vine.compile(
  vine.object({
    name: vine.string(),
    id: vine.string(),
  })
)
