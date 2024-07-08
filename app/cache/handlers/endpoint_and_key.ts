import EndpointAndKey from '#models/endpoint_and_key'
import cache from '#core/cache/cache'

async function updateCache() {
  try {
    const results = await EndpointAndKey.find().lean()
    const sortedResults = results.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    cache.set('endpoints', sortedResults)
  } catch (e) {
    console.error('[CACHE] [ENDPOINTS] Error updating cache', e)
  }
}

export default updateCache
