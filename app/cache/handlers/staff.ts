import { db } from '#core/services/db'
import cache from '#cache/cache'
import Bot from '#models/bot'

interface Endpoint {
  endpoint: string
  count: number
  time: number[]
}

interface Key {
  key: string
  count: number
  ip: string[]
}

interface EndpointAndKey {
  date: string
  endpoints: Endpoint[]
  keys: Key[]
}

interface ModelCount {
  _id: string
  count: number
}

interface ReturnedData {
  date: string
  interactionsCount?: number
  guildsCount?: number
  usersCount?: number
  guilds?: {
    name: string
    icon: string
    memberCount: number
    id: string
  }[]
  interactions?: {
    name: string
    count: number
  }[]
  endpoints?: {
    name: string
    count: number
    averageTime: number
    minTime: number
    maxTime: number
  }[]
  keys?: {
    key: string
    count: number
    ip: number
  }[]
  factionsCount?: number
}

async function countModelsByEachDate(model: any) {
  try {
    return await model.aggregate([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  } catch (error) {
    console.error('Failed to count models by each date', error)
    throw error
  }
}

function addOrUpdateReturnedDate(
  returnedArray: ReturnedData[],
  date: string,
  key: keyof ReturnedData,
  value: any
) {
  let returnedDate = returnedArray.find((b) => b.date === date)
  if (!returnedDate) {
    returnedDate = { date }
    returnedArray.push(returnedDate)
  }
  if (returnedDate) {
    ;(returnedDate[key] as any) = value
  }
}

function mapEndpoints(endpoints: Endpoint[]) {
  return endpoints.map((endpoint) => ({
    name: endpoint.endpoint,
    count: endpoint.count,
    averageTime:
      endpoint.time.length > 0
        ? endpoint.time.reduce((a, b) => a + b, 0) / endpoint.time.length
        : 0,
    minTime: Math.min(...endpoint.time),
    maxTime: Math.max(...endpoint.time),
  }))
}

function processEndpointAndKeys(returnedArray: ReturnedData[], endpointsAndKeys: EndpointAndKey[]) {
  endpointsAndKeys.forEach((endpointAndKey) => {
    addOrUpdateReturnedDate(
      returnedArray,
      endpointAndKey.date,
      'endpoints',
      mapEndpoints(endpointAndKey.endpoints)
    )
    addOrUpdateReturnedDate(
      returnedArray,
      endpointAndKey.date,
      'keys',
      endpointAndKey.keys.map((key) => ({
        key: key.key,
        count: key.count,
        ip: key.ip.length,
      }))
    )
  })
}

function processModelCounts(
  returnedArray: ReturnedData[],
  modelCounts: ModelCount[],
  key: keyof ReturnedData
) {
  modelCounts.forEach((item) => {
    addOrUpdateReturnedDate(returnedArray, item._id, key, item.count)
  })
}

function processBots(returnedArray: ReturnedData[], bots: Bot[]) {
  const lastBots = bots[bots.length - 1]

  bots.forEach((bot) => {
    addOrUpdateReturnedDate(
      returnedArray,
      bot.date,
      'interactionsCount',
      bot.interactions.reduce((acc, interaction) => acc + interaction.count, 0)
    )
    addOrUpdateReturnedDate(returnedArray, bot.date, 'guildsCount', bot.guilds.length)
    addOrUpdateReturnedDate(
      returnedArray,
      bot.date,
      'usersCount',
      bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0)
    )
    addOrUpdateReturnedDate(returnedArray, bot.date, 'interactions', bot.interactions)
  })

  const dateElement = returnedArray.find((b) => b.date === lastBots.date)
  if (dateElement) {
    dateElement.guilds = lastBots.guilds
  }
}

function initializeFields(returnedArray: ReturnedData[]) {
  returnedArray.forEach((b) => {
    b.interactionsCount = b.interactionsCount || 0
    b.guildsCount = b.guildsCount || 0
    b.usersCount = b.usersCount || 0
    b.guilds = b.guilds || []
    b.interactions = b.interactions || []
    b.endpoints = b.endpoints || []
    b.keys = b.keys || []
    b.factionsCount = b.factionsCount || 0
  })
}

export default async function updateCache() {
  try {
    const bots = await db.bot.find().lean()
    const endpointsAndKeys: EndpointAndKey[] = await db.endpointAndKey.find().lean()
    const users: ModelCount[] = await countModelsByEachDate(db.users)
    const factions: ModelCount[] = await countModelsByEachDate(db.factions)

    const returnedArray: ReturnedData[] = []

    processBots(returnedArray, bots)
    processEndpointAndKeys(returnedArray, endpointsAndKeys)
    processModelCounts(returnedArray, users, 'usersCount')
    processModelCounts(returnedArray, factions, 'factionsCount')

    initializeFields(returnedArray)
    returnedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    cache.set('staff', returnedArray)
  } catch (error) {
    console.error('[CACHE] [HOME] Failed to update cache', error)
  }
}
