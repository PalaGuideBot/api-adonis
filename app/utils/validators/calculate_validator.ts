import vine from '@vinejs/vine'

import { jobCategories } from '#utils/contents/jobs'

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
      currentLevel: vine.number().min(0).max(100),
      targetLevel: vine.number().min(0).max(100),
      petSkillPercentage: vine
        .number()
        .min(0)
        .max(40)
        .parse((value) => value || 0),
    }),
  })
)
