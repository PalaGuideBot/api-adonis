import { db } from '#core/services/db'
import cache from '#cache/cache'

export default async function updateCache() {
  try {
    const results = await db.bot.find().lean()
    const sortedResults = results.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const lastUpdated = sortedResults[sortedResults.length - 1]
    cache.set('bots', {
      guildsCount: lastUpdated.guilds.length,
      usersCount: lastUpdated.guilds.reduce((acc, guild) => acc + guild.memberCount, 0),
    })
  } catch (error: unknown) {
    console.error('[CACHE] [BOTS] Error updating cache', error)
  }
}
