import vine from '@vinejs/vine'

import { categories } from '#leaderboard/contents/categories'

export const categoryValidator = vine.compile(vine.enum(categories))
