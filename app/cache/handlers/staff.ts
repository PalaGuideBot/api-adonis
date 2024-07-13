import Bot from '#models/bot'
import { db } from '#core/services/db'
import cache from '#cache/cache'

async function countModelsByEachDate(model: any) {
  try {
    return await model.aggregate([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  } catch (error) {
    console.error(error)
    throw error
  }
}

function addOrUpdateReturnedDate(returnedArray: any[], date: string, key: string, value: any) {
  let returnedDate = returnedArray.find((b: any) => b.date === date)
  if (!returnedDate) {
    returnedDate = { date }
    returnedArray.push(returnedDate)
  }
  returnedDate[key] = value
}

function processEndpointAndKeys(returnedArray: any[], endpointsAndKeys: any[]) {
  endpointsAndKeys.forEach((endpointAndKey: any) => {
    addOrUpdateReturnedDate(
      returnedArray,
      endpointAndKey.date,
      'endpoints',
      endpointAndKey.endpoints.map((endpoint: any) => ({
        name: endpoint.endpoint,
        count: endpoint.count,
        averageTime:
          endpoint.time.length > 0
            ? endpoint.time.reduce((a: number, b: number) => a + b, 0) / endpoint.time.length
            : 0,
        minTime: Math.min(...endpoint.time),
        maxTime: Math.max(...endpoint.time),
      }))
    )

    addOrUpdateReturnedDate(
      returnedArray,
      endpointAndKey.date,
      'keys',
      endpointAndKey.keys.map((key: any) => ({
        key: key.key,
        count: key.count,
        ip: key.ip.length,
      }))
    )
  })
}

function processModelCounts(returnedArray: any[], modelCounts: any[], key: string) {
  modelCounts.forEach((item: any) => {
    addOrUpdateReturnedDate(returnedArray, item._id, key, item.count)
  })
}

function processBots(returnedArray: any[], bots: any[]) {
  const lastBots = bots[bots.length - 1]

  bots.forEach((bot: any) => {
    addOrUpdateReturnedDate(
      returnedArray,
      bot.date,
      'interactionsCount',
      bot.interactions.reduce((acc: number, interaction: any) => acc + interaction.count, 0)
    )
    addOrUpdateReturnedDate(returnedArray, bot.date, 'guildsCount', bot.guilds.length)
    addOrUpdateReturnedDate(
      returnedArray,
      bot.date,
      'usersCount',
      bot.guilds.reduce((acc: number, guild: any) => acc + guild.memberCount, 0)
    )
    addOrUpdateReturnedDate(returnedArray, bot.date, 'interactions', bot.interactions)
  })

  const dateElement = returnedArray.find((b: any) => b.date === lastBots.date)
  if (dateElement) {
    dateElement.guilds = lastBots.guilds
  }
}

function initializeFields(returnedArray: any[]) {
  returnedArray.forEach((b: any) => {
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
    const bots = await Bot.find().lean()
    const endpointsAndKeys = await db.endpointAndKey.find().lean()
    const users = await countModelsByEachDate(db.users)
    const factions = await countModelsByEachDate(db.factions)

    const returnedArray: any[] = []

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
