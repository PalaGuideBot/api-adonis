import vine from '@vinejs/vine'

export const commandsValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
