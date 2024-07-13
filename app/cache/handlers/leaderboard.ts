import { MeService } from '#paladium/services/me'
import cache from '#cache/cache'
import { DateTime } from 'luxon'
import Factions from '#models/unique/factions'
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
  if (name === 'factions') {
    const lastEntry = modelLean[modelLean.length - 1]
    let lastFactionsData = lastEntry.data.slice(0, 3)

    await Promise.all(
      lastFactionsData.map(async (faction: any) => {
        const emblem = (await API.postImageEmbleme(faction.embleme)) as any
        faction.emblemeUrl = emblem.url
      })
    )

    return modelLean
  } else if (name === 'trixium_faction') {
    const allFactionsUUID = modelLean
      .flatMap((group: any) => group.data)
      .slice(0, 100)
      .map((faction: any) => faction.uuid)

    const factionsData = await Factions.find({ uuid: { $in: allFactionsUUID } }).lean()

    const factionReduced = factionsData.reduce((acc: any, faction: any) => {
      acc[faction.uuid] = faction
      return acc
    }, {})

    modelLean.map((faction: any) => {
      faction.data.map((factionData: any) => {
        const factionInfo = factionReduced[factionData.uuid]
        factionData.name = factionInfo && factionInfo.bgName ? factionInfo.bgName : factionData.name
      })
    })

    const lastFactions = modelLean[modelLean.length - 1].data.slice(0, 3)

    await Promise.all(
      lastFactions.map(async (faction: any) => {
        const emblem = (await API.postImageEmbleme(faction.embleme)) as any
        faction.emblemeUrl = emblem.url
      })
    )

    return modelLean
  }
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
