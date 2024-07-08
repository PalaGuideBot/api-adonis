import vine from '@vinejs/vine'

export const factionProfileValidator = vine.compile(
  vine.object({
    createdAt: vine.number(),
    description: vine.string(),
    emblem: vine.array(vine.number()),
    name: vine.string(),
    uuid: vine.string(),
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
