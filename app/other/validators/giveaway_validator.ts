import vine from '@vinejs/vine'

export const createGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string(),
    start: vine.date(),
    end: vine.date(),
    prizes: vine.array(vine.string()),
  })
)

export const updateGiveawayValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    active: vine.boolean().optional(),
    start: vine.date().optional(),
    end: vine.date().optional(),
    prizes: vine.array(vine.string()).optional(),
  })
)

export const participateGiveawayValidator = vine.compile(
  vine.object({
    id: vine.string(),
  })
)

export const leaveGiveawayValidator = vine.compile(
  vine.object({
    id: vine.string(),
  })
)

export const drawGiveawayValidator = vine.compile(
  vine.object({
    count: vine.number().parse((value) => Number(value || 1)),
  })
)
