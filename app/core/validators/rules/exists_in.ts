import vine from '@vinejs/vine'
import { type FieldContext } from '@vinejs/vine/types'
import { type InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'

/**
 * Options accepted by the existsIn rule
 */
type Options<T extends keyof typeof db> = {
  model: T
  column: keyof InferSchemaType<(typeof db)[T]['schema']>
}

/**
 * Implementation
 */
async function existsIn<T extends keyof typeof db>(
  value: unknown,
  options: Options<T>,
  field: FieldContext
) {
  const model = db[options.model]

  // @ts-ignore
  const row = await model.exists({ [options.column]: value })

  if (!row) {
    field.report("The {{ field }} field is don't exists", 'existsIn', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existsInRule = vine.createRule(existsIn)
