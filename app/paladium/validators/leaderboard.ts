import vine, { VineValidator } from '@vinejs/vine'

import { LeaderboardTrixiumCategory } from '#leaderboard/types'

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

const leaderboardTrixiumPlayersValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        username: vine.string(),
        value: vine.number(),
      })
    ),
    totalCount: vine.number(),
  })
)

const leaderboardTrixiumFactionsValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        uuid: vine.string(),
        value: vine.number(),
      })
    ),
    totalCount: vine.number(),
  })
)

export const trixiumValidators = {
  player: leaderboardTrixiumPlayersValidator,
  faction: leaderboardTrixiumFactionsValidator,
} satisfies Record<LeaderboardTrixiumCategory, VineValidator<any, any>>
