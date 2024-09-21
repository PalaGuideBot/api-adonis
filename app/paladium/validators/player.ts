import vine from '@vinejs/vine'

const jobs = vine
  .object({
    level: vine.number(),
    xp: vine.number(),
  })
  .parse((value) => value ?? { level: 0, xp: 0 })

export const playerProfileValidator = vine.compile(
  vine.object({
    faction: vine.string().optional().nullable(),
    factionRank: vine.string().optional().nullable(),
    firstJoin: vine.number().optional().nullable(),
    money: vine.number().optional().nullable(),
    rank: vine.string().optional().nullable(),
    timePlayed: vine.number().optional().nullable(),
    username: vine.string(),
    uuid: vine.string(),
  })
)

export const playerJobsValidator = vine.compile(
  vine.object({
    alchemist: jobs,
    farmer: jobs,
    hunter: jobs,
    miner: jobs,
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

export const playerFriendsValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        uuid: vine.string(),
        name: vine.string(),
        rank: vine.string(),
      })
    ),
    totalCount: vine.number(),
  })
)

export const playerPetValidator = vine.compile(
  vine.object({
    currentSkin: vine.string(),
    happiness: vine.number(),
    experience: vine.number(),
    skills: vine.array(
      vine.object({
        id: vine.string(),
        lastChange: vine.number(),
        nextUse: vine.number(),
      })
    ),
  })
)

export const playerMountValidator = vine.compile(
  vine.object({
    mountType: vine.number(),
    name: vine.string().optional(),
    damage: vine.number(),
    food: vine.number(),
    sharedXpPercent: vine.number(),
    xp: vine.number(),
  })
)

export const playerClickerValidator = vine.compile(
  vine.object({
    buildings: vine.array(
      vine.object({
        name: vine.string(),
        production: vine.number(),
        quantity: vine.number(),
      })
    ),
    lastBuildingBought: vine.string(),
    rps: vine.number(),
    upgrades: vine.array(vine.string()),
    uuid: vine.string(),
  })
)
