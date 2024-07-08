import vine from '@vinejs/vine'

export const imageValidator = vine.compile(
  vine.object({
    id: vine.string(),
    url: vine.string(),
  })
)
