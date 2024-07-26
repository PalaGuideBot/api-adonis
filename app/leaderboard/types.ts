import { categories, trixiumCategories } from '#leaderboard/contents/categories'
import { Model } from 'mongoose'

export type LeaderboardCategory = (typeof categories)[number]

export type LeaderboardTrixiumCategory = (typeof trixiumCategories)[number]

export type Category =
  | Exclude<LeaderboardCategory, 'job.alchemist' | 'job.hunter' | 'job.miner' | 'job.farmer'>
  | `trixium.${LeaderboardTrixiumCategory}`

export type CategoryItem = {
  name: Category
  cacheKey: string
  model: Model<any>
}
