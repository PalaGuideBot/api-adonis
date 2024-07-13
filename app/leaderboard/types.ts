import { categories, trixiumCategories } from '#leaderboard/contents/categories'

export type LeaderboardCategory = (typeof categories)[number]

export type LeaderboardTrixiumCategory = (typeof trixiumCategories)[number]
