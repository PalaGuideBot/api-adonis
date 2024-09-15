import vine from '@vinejs/vine'

export const factionProfileValidator = vine.compile(
  vine.object({
    createdAt: vine.number(),
    description: vine.string(),
    emblem: vine
      .array(vine.number())
      .parse((value) => (value ? Object.values(value) : ([] as number[]))),
    name: vine.string(),
    uuid: vine.string(),
    level: vine.object({
      level: vine.number(),
      xp: vine.number(),
    }),
  })
)

export const factionMembersValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        group: vine.string(),
        joinedAt: vine.number(),
        username: vine.string(),
        uuid: vine.string(),
      })
    ),
    totalCount: vine.number(),
  })
)

export const factionQuestValidator = vine.compile(
  vine.object({
    item: vine.string(),
    quantity: vine.number(),
    earningMoney: vine.number(),
    earningXp: vine.number(),
    start: vine.number(),
    end: vine.number(),
  })
)

export const factionOnYourMarksValidator = vine.compile(
  vine.object({
    goalType: vine.enum([
      'BREAK_BLOCKS',
      'MOB_KILL',
      'FISHING',
      'WALK',
      'ITEM_CRAFT',
      'ITEM_SMELT',
      'ITEM_CRAFT_PALAMACHINE',
      'ITEM_ENCHANT',
      'GRINDER_CRAFT',
      'GRINDER_SMELT',
      'USE_ITEM',
    ]),
    extra: vine.string().nullable(),
    amount: vine.number(),
    rewardElo: vine.number(),
    serverType: vine.enum(['LOBBY', 'FACTION', 'MINAGE', 'FARMLAND', 'GAME', 'DIM_MINER']),
    start: vine.number(),
    end: vine.number(),
    state: vine.enum(['NOT_STARTED', 'RUNNING', 'FINISHED']),
  })
)
