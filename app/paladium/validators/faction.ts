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
