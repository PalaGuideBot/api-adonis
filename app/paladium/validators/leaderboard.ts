import vine from '@vinejs/vine'

export const factionsLeaderboardValidator = vine.compile(
  vine.array(
    vine.object({
      name: vine.string(),
      elo: vine.number(),
    })
  )
)

export const leaderboardCategoryValidator = vine.compile(
  vine.array(
    vine.object({
      username: vine.string(),
      value: vine.number(),
    })
  )
)

export const leaderboardTrixiumPlayersValidator = vine.compile(
  vine.array(
    vine.object({
      username: vine.string(),
      value: vine.number(),
    })
  )
)

export const leaderboardTrixiumFactionsValidator = vine.compile(
  vine.array(
    vine.object({
      uuid: vine.string(),
      value: vine.number(),
    })
  )
)
