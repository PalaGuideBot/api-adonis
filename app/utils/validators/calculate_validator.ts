import vine from '@vinejs/vine'

import { jobCategories } from '#utils/contents/jobs'
import { items } from '#utils/contents/pogs'

export const calculateJobValidator = vine.compile(
  vine.object({
    body: vine
      .object({
        mode: vine.enum(['standard', 'reverse']),
        job: vine.enum(jobCategories),
        currentLevel: vine.number().min(0),
        bonusXp: vine.number().min(0).max(500),
        currentXp: vine.number().min(0),
      })
      .merge(
        vine.group([
          vine.group.if((data) => data.mode === 'standard', {
            mode: vine.literal('standard'),
            targetLevel: vine.number().min(0),
          }),
          vine.group.if((data) => data.mode === 'reverse', {
            mode: vine.literal('reverse'),
            items: vine.array(
              vine.object({ quantity: vine.number(), itemId: vine.string(), action: vine.string() })
            ),
          }),
        ])
      ),
  })
)

export const calculatePogValidator = vine.compile(
  vine.object({
    body: vine.object({
      block: vine.enum(items.map((item) => item.id)),
      currentLevel: vine.number().min(0).max(100),
      currentXp: vine
        .number()
        .positive()
        .parse((value) => value || 0),
      goodPickaxePercentage: vine
        .number()
        .min(0)
        .max(40)
        .parse((value) => value || 0),
      experiencedPickaxePercentage: vine
        .number()
        .min(0)
        .max(30)
        .parse((value) => value || 0),
    }),
  })
)
