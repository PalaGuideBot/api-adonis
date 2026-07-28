import { type categories, type trixiumCategories } from '#leaderboard/contents/categories'
import { type Model } from 'mongoose'

export type LeaderboardCategory = (typeof categories)[number]

export type LeaderboardTrixiumCategory = (typeof trixiumCategories)[number]

export type Category = LeaderboardCategory | `trixium.${LeaderboardTrixiumCategory}`

export type CategoryItem = {
  name: Category
  cacheKey: string
  model: Model<any>
}
