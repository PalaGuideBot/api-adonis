import vine from '@vinejs/vine'

const jobs = vine.object({
  level: vine.number(),
  xp: vine.number(),
})

export const playerProfileValidator = vine.compile(
  vine.object({
    faction: vine.string(),
    firstJoin: vine.number(),
    jobs: vine.object({
      alchemist: jobs,
      farmer: jobs,
      hunter: jobs,
      miner: jobs,
    }),
    money: vine.number(),
    rank: vine.string(),
    timePlayed: vine.number(),
    username: vine.string(),
    uuid: vine.string(),
  })
)

export const playerRankValidator = vine.compile(
  vine
    .object({
      'boss': vine.number(),
      'money': vine.number(),
      'job-farmer': vine.number(),
      'job-miner': vine.number(),
      'job-hunter': vine.number(),
      'job-alchemist': vine.number(),
      'end': vine.number(),
      'koth': vine.number(),
      'chorus': vine.number(),
      'egghunt': vine.number(),
      'clicker': vine.number(),
    })
    .toCamelCase()
)

export const playerTrixiumRankingValidator = vine.compile(
  vine.object({
    position: vine.number(),
    username: vine.string(),
    uuid: vine.string(),
    value: vine.number(),
  })
)

export const playerAchievementsValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        completed: vine.boolean(),
        id: vine.string(),
        progress: vine.number(),
      })
    ),
    totalCount: vine.number(),
  })
)
