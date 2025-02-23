import { db } from '#core/services/db'
import type { CategoryItem } from '#leaderboard/types'

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
  'alliance',
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
    model: db.leaderboardTrixiumPlayer,
  },
  {
    name: 'alliance',
    cacheKey: 'leaderboard:alliance',
    model: db.leaderboardAlliance,
  },
  {
    name: 'job.alchemist',
    cacheKey: 'leaderboard:job.alchemist',
    model: db.leaderboardJobAlchemist,
  },
  {
    name: 'job.farmer',
    cacheKey: 'leaderboard:job.farmer',
    model: db.leaderboardJobFarmer,
  },
  {
    name: 'job.hunter',
    cacheKey: 'leaderboard:job.hunter',
    model: db.leaderboardJobHunter,
  },
  {
    name: 'job.miner',
    cacheKey: 'leaderboard:job.miner',
    model: db.leaderboardJobMiner,
  },
] satisfies CategoryItem[]

export { categories, config, trixiumCategories }
