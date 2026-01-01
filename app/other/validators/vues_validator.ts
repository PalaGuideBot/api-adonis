import vine from '@vinejs/vine'

export const vuesIncrementValidator = vine.compile(
  vine.object({
    uuid: vine.string(),
  })
)
