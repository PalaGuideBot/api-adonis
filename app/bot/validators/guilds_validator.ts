import vine from '@vinejs/vine'

export const guildsValidator = vine.compile(
  vine.array(
    vine.object({
      name: vine.string(),
      icon: vine.string().optional(),
      memberCount: vine.number(),
      id: vine.string(),
    })
  )
)
