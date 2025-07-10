import vine from '@vinejs/vine'

export const createDropValidator = vine.compile(
  vine.object({
    title: vine.string(),
    start: vine.date({ formats: ['YYYY-MM-DD HH:mm:ss'] }),
    end: vine.date({ formats: ['YYYY-MM-DD HH:mm:ss'] }),
    prize: vine.string(),
    slices: vine.number().min(1),
  })
)

export const updateDropValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    active: vine.boolean().optional(),
    start: vine.date({ formats: ['YYYY-MM-DD HH:mm:ss'] }).optional(),
    end: vine.date({ formats: ['YYYY-MM-DD HH:mm:ss'] }).optional(),
    prize: vine.string().optional(),
    slices: vine.number().min(1).optional(),
  })
)

export const participateDropValidator = vine.compile(
  vine.object({
    id: vine.string(),
  })
)

export const addWinnerDropValidator = vine.compile(
  vine.object({
    id: vine.string(),
  })
)
