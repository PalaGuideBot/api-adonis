import { DateTime } from 'luxon'
import mongoose from 'mongoose'
import type { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'

type IncrementPayload = { uuid: string }
type Player = InferSchemaType<typeof db.players.schema>
type PlayerData = Player['data'][number]

class VuesRepository {
  async increment(payload: IncrementPayload) {
    const today = DateTime.now().toFormat('yyyy-MM-dd')

    const player = await db.players.findOne({ uuid: payload.uuid })

    if (!player) {
      return null
    }

    const todayDataIndex = player.data.findIndex((d: PlayerData) => d.date === today)

    if (todayDataIndex === -1) {
      return { vues: 0, created: false, message: 'No data entry for today' }
    }

    const dbConnection = mongoose.connection.useDb('paladium')
    const collection = dbConnection.collection('unique.players')

    await collection.updateOne(
      { 'uuid': payload.uuid, 'data.date': today },
      {
        $inc: { 'data.$.vues': 1 },
      }
    )

    const updatedPlayer = await collection.findOne({ uuid: payload.uuid })
    const updatedData = updatedPlayer?.data?.find((d: PlayerData) => d.date === today)
    const vues = updatedData?.vues || 1

    return { vues, uuid: payload.uuid, date: today }
  }

  async get(payload: IncrementPayload) {
    const player = await db.players.findOne({ uuid: payload.uuid })

    if (!player) {
      return null
    }

    const totalVues = player.data.reduce((sum: number, d: PlayerData) => {
      return sum + (d.vues || 0)
    }, 0)

    return {
      total: totalVues,
      uuid: payload.uuid,
    }
  }
}

export { VuesRepository }
