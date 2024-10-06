import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

export const distanceValidator = vine.compile(
  vine.object({
    from: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
    to: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .transform((value) => DateTime.fromJSDate(value))
      .optional(),
  })
)

export const distanceValidatorToString = (value: Infer<typeof distanceValidator>) => {
  return `from:${value.from?.toSQLDate()}|to:${value.to?.toSQLDate()}`
}
