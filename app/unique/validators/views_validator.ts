import vine from '@vinejs/vine'

export const viewsIncrementValidator = vine.compile(
  vine.object({
    uuid: vine.string(),
  })
)
