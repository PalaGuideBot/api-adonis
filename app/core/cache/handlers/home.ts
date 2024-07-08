import Bot from '#models/bot'
import cache from '#core/cache/cache'

async function updateCache() {
  try {
    const results = await Bot.find().lean()
    const sortedResults = results.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const lastUpdated = sortedResults[sortedResults.length - 1]
    cache.set('bots', {
      guildsCount: lastUpdated.guilds.length,
      usersCount: lastUpdated.guilds.reduce((acc, guild) => acc + guild.memberCount, 0),
    })
  } catch (e) {
    console.error('[CACHE] [BOTS] Error updating cache', e)
  }
}

export default updateCache
