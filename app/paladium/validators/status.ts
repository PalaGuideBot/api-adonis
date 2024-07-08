import vine from '@vinejs/vine'

export const statusValidator = vine.compile(
  vine.object({
    java: vine.object({
      global: vine.object({
        status: vine.string(),
        players: vine.number(),
      }),
      factions: vine.object({
        Soleratl: vine.string(),
        Muzdan: vine.string(),
        Manashino: vine.string(),
        Event: vine.string(),
        Luccento: vine.string(),
        Imbali: vine.string(),
        Keltis: vine.string(),
        Neolith: vine.string(),
        Untaa: vine.string(),
      }),
    }),
    launcher: vine.object({
      status: vine.string(),
    }),
  })
)
