import { MeService } from '#paladium/services/me'
import cache from '#cache/cache'
import { DateTime } from 'luxon'
import { db } from '#core/services/db'

const models: { name: string; model: any }[] = [
  {
    name: 'boss',
    model: db.leaderboardBoss,
  },
  {
    name: 'chorus',
    model: db.leaderboardChorus,
  },
  {
    name: 'clicker',
    model: db.leaderboardClicker,
  },
  {
    name: 'eggHunt',
    model: db.leaderboardEggHunt,
  },
  {
    name: 'end',
    model: db.leaderboardEnd,
  },
  {
    name: 'factions',
    model: db.leaderboardFactions,
  },
  {
    name: 'koth',
    model: db.leaderboardKoth,
  },
  {
    name: 'money',
    model: db.leaderboardMoney,
  },
  {
    name: 'trixium_faction',
    model: db.leaderboardTrixiumFaction,
  },
  {
    name: 'trixium_user',
    model: db.leaderboardTrixiumUser,
  },
]

const API = new MeService()

async function factionsUpdate(modelLean: any, name: string) {
  if (name === 'triuxium_faction') {
    const allUUIDS = modelLean
      .flatMap((x: any) => x.data)
      .slice(0, 100)
      .map((x: any) => x.uuid)
    const factionsData = await db.factions.find({ uuid: { $in: allUUIDS } }).lean()

    const factionsDataMap = factionsData.reduce((acc: any, faction: any) => {
      acc[faction.uuid] = faction
      return acc
    }, {})

    modelLean = modelLean.map((entry: any) => {
      if (Array.isArray(entry.data)) {
        const filteredData = entry.data.map((x: any) => {
          const factionData = factionsDataMap[x.uuid]
          if (factionData) {
            return { ...x, name: factionData.name }
          }
          return x
        })
        return { date: entry.date, data: filteredData }
      }
      return { date: entry.date, data: [] }
    })
  }

  const lastEntry = modelLean[modelLean.length - 1].data.slice(0, 3)

  await Promise.all(
    lastEntry.map(async (entry: any) => {
      const factionData = (await db.factions
        .findOne({ name: entry.name.toString().toLowerCase() })
        .lean()) as any
      const embleme = (await API.postImageEmbleme(factionData.embleme)) as any
      entry.emblemUrl = embleme.url
    })
  )
}

async function filteredReply(modelLean: any, usernameOrName: string) {
  const lastEntry = modelLean[modelLean.length - 1].data.slice(0, 100)
  const lastSet = new Set(lastEntry.map((x: any) => x[usernameOrName]))

  return modelLean.map((entry: any) => {
    if (Array.isArray(entry.data)) {
      const filteredData = entry.data.filter((x: any) => lastSet.has(x[usernameOrName]))
      return { date: entry.date, data: filteredData }
    }
    return { date: entry.date, data: [] }
  })
}

export default async function updateCache() {
  const todayDate = DateTime.now().toFormat('yyyy-MM-dd')
  for (const model of models) {
    const cacheModel = (await cache.get('leaderboard:' + model.name)) as any[]
    const hasDate = await cacheModel.find((c: any) => c.date === todayDate)
    if (!cacheModel || !hasDate) {
      if (model.name === 'factions' || model.name === 'trixium_faction') {
        const factions = await model.model.find().lean()
        const result = await factionsUpdate(factions, model.name)
        const filteredResult = await filteredReply(result, 'name')

        await cache.set('leaderboard:' + model.name, filteredResult)
      } else {
        const result = await model.model.find().lean()
        const filteredResult = await filteredReply(result, 'username')
        await cache.set('leaderboard:' + model.name, filteredResult)
      }
    }
  }
}
