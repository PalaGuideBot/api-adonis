import vine from '@vinejs/vine'

export const statusValidator = vine.compile(
  vine.object({
    java: vine.object({
      global: vine.object({
        status: vine.string(),
        players: vine.number(),
      }),
      factions: vine.object({
        Runegard: vine.string(),
        Xanoth: vine.string(),
        Egopolis: vine.string(),
        Kilmordra: vine.string(),
        Aeloria: vine.string(),
      }),
    }),
    launcher: vine.object({
      status: vine.string(),
    }),
  })
)
