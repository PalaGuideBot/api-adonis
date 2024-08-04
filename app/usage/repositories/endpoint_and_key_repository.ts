import { db } from '#core/services/db'

class EndpointAndKeyRepository {
  async findStatistics() {
    const endpointsAndKeys = await db.endpointAndKey.find().lean()

    return endpointsAndKeys.map((y) => ({
      date: y.date,
      endpoints: y.endpoints.map((e) => ({
        name: e.endpoint,
        count: e.count,
        averageTime:
          e.time.length > 0 ? e.time.reduce((acc, time) => acc + time, 0) / e.time.length : 0,
        minTime: e.time.length > 0 ? Math.min(...e.time) : 0,
        maxTime: e.time.length > 0 ? Math.max(...e.time) : 0,
      })),
      keys: y.keys.map((k) => ({
        key: k.key,
        count: k.count,
        ip: k.ip.length,
      })),
    }))
  }
}

export { EndpointAndKeyRepository }
