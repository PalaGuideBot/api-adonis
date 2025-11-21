import mongoose, { Connection, Schema } from 'mongoose'

interface Retry {
  count?: number
  disabled?: boolean
}

interface FactionPlayer {
  group: string
  joinedAt: number
  username: string
  uuid: string
}

const factionPlayerSchema = new Schema<FactionPlayer>({
  group: String,
  joinedAt: Number,
  username: String,
  uuid: String,
})

interface Faction {
  uuid: string
  date: string
  newDate: Date
  name: string
  bgName: string
  description: string
  createdAt: number
  emblem: number[]
  alliance?: string
  players: FactionPlayer[]
  retry: Retry
}

const factionSchema = new Schema<Faction>({
  uuid: String,
  date: String,
  newDate: Date,
  name: String,
  bgName: String,
  description: String,
  createdAt: Number,
  emblem: [Number],
  alliance: String,
  players: [factionPlayerSchema],
  retry: {
    count: Number,
    disabled: Boolean,
  },
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const Factions = dbConnection.model<Faction>('unique.faction', factionSchema)

export default Factions
