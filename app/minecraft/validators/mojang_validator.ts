import vine from '@vinejs/vine'

/* export const minecraftUserProfileValidator = vine.compile(
  vine.object({
    name: vine.string(),
    id: vine.string(),
  })
) */

export const minecraftUserProfileValidator = vine.compile(
  vine.object({
    data: vine.object({
      player: vine.object({
        username: vine.string(),
        raw_id: vine.string(),
      }),
    }),
  })
)
