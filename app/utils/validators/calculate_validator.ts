import vine from '@vinejs/vine'

import { jobCategories } from '#utils/contents/jobs'
import { items } from '#utils/contents/pogs'

export const calculateJobValidator = vine.compile(
  vine.object({
    body: vine.object({
      job: vine.enum(jobCategories),
      currentLevel: vine.number().min(0).max(100),
      targetLevel: vine.number().min(0).max(100),
      bonusXp: vine.number().min(0).max(50),
      currentXp: vine.number().min(0),
    }),
  })
)

export const reverseCalculateJobValidator = vine.compile(
  vine.object({
    body: vine.object({
      item: vine.string(),
      currentLevel: vine.number().min(0).max(100),
      bonusXp: vine.number().min(0).max(50),
      currentXp: vine.number().min(0),
      amount: vine.number().min(1),
    }),
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
