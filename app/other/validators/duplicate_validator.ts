import vine from '@vinejs/vine'

export const duplicateCreateValidator = vine.compile(
  vine.object({
    uuid: vine.string(),
  })
)
