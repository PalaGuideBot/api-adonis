import { db } from '#core/services/db'
import cache from '#cache/cache'

export default async function updateCache() {
  try {
    const results = await db.endpointAndKey.find().lean()
    const sortedResults = results.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    await cache.set('endpoint_and_key', sortedResults)
  } catch (error: unknown) {
    console.error(error)
  }
}
