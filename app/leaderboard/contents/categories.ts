import { db } from '#core/services/db'
import { CategoryItem } from '#leaderboard/types'

const categories = [
  'money',
  'job.alchemist',
  'job.hunter',
  'job.miner',
  'job.farmer',
  'boss',
  'egghunt',
  'end',
  'chorus',
  'koth',
  'clicker',
  'factions',
] as const

const trixiumCategories = ['player', 'faction'] as const

const config = [
  {
    name: 'boss',
    cacheKey: 'leaderboard:boss',
    model: db.leaderboardBoss,
  },
  {
    name: 'chorus',
    cacheKey: 'leaderboard:chorus',
    model: db.leaderboardChorus,
  },
  {
    name: 'clicker',
    cacheKey: 'leaderboard:clicker',
    model: db.leaderboardClicker,
  },
  {
    name: 'egghunt',
    cacheKey: 'leaderboard:egghunt',
    model: db.leaderboardEggHunt,
  },
  {
    name: 'end',
    cacheKey: 'leaderboard:end',
    model: db.leaderboardEnd,
  },
  {
    name: 'factions',
    cacheKey: 'leaderboard:factions',
    model: db.leaderboardFactions,
  },
  {
    name: 'koth',
    cacheKey: 'leaderboard:koth',
    model: db.leaderboardKoth,
  },
  {
    name: 'money',
    cacheKey: 'leaderboard:money',
    model: db.leaderboardMoney,
  },
  {
    name: 'trixium.faction',
    cacheKey: 'leaderboard:trixium.faction',
    model: db.leaderboardTrixiumFaction,
  },
  {
    name: 'trixium.player',
    cacheKey: 'leaderboard:trixium.player',
    model: db.leaderboardTrixiumUser,
  },
] satisfies CategoryItem[]

export { categories, trixiumCategories, config }
