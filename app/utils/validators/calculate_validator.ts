import vine from '@vinejs/vine'
import { jobCategories } from '#utils/contents/jobs'

export const calculateJobValidator = vine.compile(
  vine.object({
    job: vine.enum(jobCategories),
    currentLevel: vine.number().min(0).max(99),
    targetLevel: vine.number().min(0).max(99),
    bonusXp: vine.number().min(0).max(20),
    currentXp: vine.number().min(0),
  })
)

export const reverseCalculateJobValidator = vine.compile(
  vine.object({
    item: vine.string(),
    currentLevel: vine.number().min(0).max(99),
    bonusXp: vine.number().min(0).max(20),
    currentXp: vine.number().min(0),
    amount: vine.number().min(1),
  })
)

export const calculatePogValidator = vine.compile(
  vine.object({
    currentLevel: vine.number().min(0).max(99),
    targetLevel: vine.number().min(0).max(99),
    currentXp: vine.number().min(0),
  })
)
