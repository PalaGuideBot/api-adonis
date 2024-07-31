import { Secret } from '@adonisjs/core/helpers'
import vine from '@vinejs/vine'

const secretValidator = vine.object({
  name: vine.string(),
  value: vine.string().transform((value) => new Secret(value)),
})

const secretsValidator = vine.compile(vine.array(secretValidator))

export { secretsValidator }
