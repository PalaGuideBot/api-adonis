import { DateTime } from 'luxon'
import cron, { ScheduledTask, ScheduleOptions } from 'node-cron'

import { db } from '#core/services/db'

type Endpoint = {
  count: number
  time: number[]
}

type Key = {
  count: number
  ips: string[]
}

class EndpointManager {
  endpoints: Map<string, Endpoint> = new Map<string, Endpoint>()
  keys: Map<string, Key> = new Map<string, Key>()

  task: ScheduledTask | null = null

  collectEndpoint(endpoint: string, responseTime: number) {
    const target = this.endpoints.get(endpoint)

    if (target) {
      this.endpoints.set(endpoint, {
        count: target.count + 1,
        time: [...target.time, responseTime],
      })
      return
    }

    this.endpoints.set(endpoint, { count: 1, time: [responseTime] })
  }

  collectKey(key: string, ip: string) {
    const target = this.keys.get(key)

    if (target) {
      this.keys.set(key, {
        count: target.count + 1,
        ips: Array.from(new Set([...target.ips, ip])),
      })
      return
    }

    this.keys.set(key, { count: 1, ips: [ip] })
  }

  async syncToDatabase() {
    if (this.endpoints.size === 0 && this.keys.size === 0) {
      return
    }

    const now = DateTime.now().toFormat('yyyy-MM-dd')

    try {
      const endpointAndKey = await db.endpointAndKey.findOneAndUpdate(
        { date: now },
        { $setOnInsert: { date: now, endpoints: [], keys: [] } },
        { upsert: true, new: true }
      )

      this.endpoints.forEach((data, endpoint) => {
        const index = endpointAndKey.endpoints.findIndex((item) => item.endpoint === endpoint)
        if (index === -1) {
          endpointAndKey.endpoints.push({ ...data, endpoint })
        } else {
          endpointAndKey.endpoints = endpointAndKey.endpoints.map((item) => {
            if (item.endpoint === endpoint) {
              item.count += data.count
              item.time = [...item.time, ...data.time]
            }
            return item
          })
        }
      })
      this.keys.forEach((data, key) => {
        const index = endpointAndKey.keys.findIndex((item) => item.key === key)
        if (index === -1) {
          endpointAndKey.keys.push({ ip: data.ips, count: data.count, key })
        } else {
          endpointAndKey.keys = endpointAndKey.keys.map((item) => {
            if (item.key === key) {
              item.count += data.count
              item.ip = Array.from(new Set([...item.ip, ...data.ips]))
            }
            return item
          })
        }
      })

      await endpointAndKey.save()

      this.clearBuffer()
    } catch (error: unknown) {}
  }

  clearBuffer() {
    this.endpoints.clear()
    this.keys.clear()
  }

  schedule(expression: string, options?: ScheduleOptions) {
    this.task = cron.schedule(expression, () => this.syncToDatabase(), options)
    return this.task
  }

  stopSchedule() {
    if (!this.task) {
      return
    }

    this.task.stop()
    this.task = null
  }
}

export { EndpointManager }
