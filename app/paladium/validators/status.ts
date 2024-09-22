import vine from '@vinejs/vine'

export const statusValidator = vine.compile(
  vine.object({
    java: vine.object({
      global: vine.object({
        status: vine.string(),
        players: vine.number(),
      }),
      factions: vine.object({
        Aeloria: vine.string(),
        Egopolis: vine.string(),
        Runegard: vine.string(),
        Event: vine.string(),
        Kilmordra: vine.string(),
        Xanoth: vine.string(),
      }),
    }),
    launcher: vine.object({
      status: vine.string(),
    }),
  })
)
