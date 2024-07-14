import { DateTime } from 'luxon'
import { HydratedDocument, InferSchemaType, Model } from 'mongoose'

import cache from '#cache/cache'
import { db } from '#core/services/db'
import { LeaderboardCategory, LeaderboardTrixiumCategory } from '#leaderboard/types'
import { MeService } from '#paladium/services/me'

type Category =
  | Exclude<LeaderboardCategory, 'job.alchemist' | 'job.hunter' | 'job.miner' | 'job.farmer'>
  | `trixium.${LeaderboardTrixiumCategory}`

type CategoryItem = {
  name: Category
  cacheKey: string
  model: Model<any>
}

const categories = [
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

const API = new MeService()

function filterResult(
  data: HydratedDocument<InferSchemaType<(typeof categories)[number]['model']['schema']>>[]
) {
  const lastData = data[data.length - 1].data.slice(0, 100)
  const existingValues = new Set(
    lastData.map((item) => ('name' in item ? item.name : item.username))
  )

  return data.map((entry) => {
    if (Array.isArray(entry.data)) {
      const filteredData = entry.data.filter((item) =>
        existingValues.has('name' in item ? item.name : item.username)
      )
      return { date: entry.date, data: filteredData }
    }
    return { date: entry.date, data: [] }
  })
}

async function serializeFactions(
  data: HydratedDocument<InferSchemaType<typeof db.leaderboardFactions.schema>>[]
) {
  const lastData = data[data.length - 1]

  return [
    ...data.filter((item) => item.date !== lastData.date),
    {
      ...lastData,
      data: await Promise.all(
        lastData.data.map(async (item, index) => {
          if (index < 3) {
            const faction = await db.factions.findOne({ name: item.name }).lean()

            if (!faction) {
              return item
            }

            const emblem = await API.postImageEmbleme(faction.emblem)

            return {
              ...item,
              emblemUrl: emblem?.url,
            }
          }
          return item
        })
      ),
    },
  ]
}

async function serializeTrixiumFactions(
  data: HydratedDocument<InferSchemaType<typeof db.leaderboardTrixiumFaction.schema>>[]
) {
  const lastData = data[data.length - 1]

  const UUIDs = data[0].data.map((item) => item.uuid)

  const factions = await db.factions.find({ uuid: { $in: UUIDs } }).lean()

  return [
    ...data.filter((item) => item.date !== lastData.date),
    {
      ...lastData,
      data: await Promise.all(
        lastData.data.map(async (item, index) => {
          if (index < 3) {
            const faction = await db.factions.findOne({ uuid: item.uuid }).lean()

            if (!faction) {
              return item
            }

            const emblem = await API.postImageEmbleme(faction.emblem)
            return {
              ...item,
              emblemUrl: emblem?.url,
            }
          }
          return item
        })
      ),
    },
  ].map((entry) => {
    if (Array.isArray(entry.data)) {
      const parsedData = entry.data.map((item) => {
        const faction = factions.find((x) => x.uuid === item.uuid)
        return faction ? { ...item, name: faction.name } : item
      })
      return { date: entry.date, data: parsedData }
    }
    return { date: entry.date, data: [] }
  })
}

export default async function updateCache() {
  const now = DateTime.now().toSQLDate()

  for (const category of categories) {
    const cachedData = (await cache.get(category.cacheKey)) as HydratedDocument<
      InferSchemaType<typeof category.model.schema>
    >[]
    const isCacheValid = cachedData && cachedData.some((x) => x.date === now)

    if (!isCacheValid) {
      switch (category.name) {
        case 'factions':
          const factions = await category.model.find()
          const serializedFactions = await serializeFactions(factions)
          await cache.set(category.cacheKey, filterResult(serializedFactions as typeof factions))
          break
        case 'trixium.faction':
          const trixiumFactions = await category.model.find()
          const serializedTrixiumFactions = await serializeTrixiumFactions(trixiumFactions)
          await cache.set(
            category.cacheKey,
            filterResult(serializedTrixiumFactions as typeof trixiumFactions)
          )
          break
        default:
          const data = await category.model.find()
          await cache.set(category.cacheKey, filterResult(data))
      }
    }
  }
}
