import { model, Schema } from 'mongoose'

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

interface FactionData {
  date: string
  data: {
    level: {
      level: number
      xp: number
    }
    elo: number
  }
}

const factionDataSchema = new Schema<FactionData>({
  date: String,
  data: {
    level: {
      level: Number,
      xp: Number,
    },
    elo: Number,
  },
})

interface Faction {
  uuid: string
  name: string
  bgName: string
  description: string
  createdAt: number
  emblem: number[]
  players: FactionPlayer[]
  data: FactionData[]
  retry: Retry
}

const factionSchema = new Schema<Faction>({
  uuid: String,
  name: String,
  bgName: String,
  description: String,
  createdAt: Number,
  emblem: [Number],
  players: [factionPlayerSchema],
  data: [factionDataSchema],
  retry: {
    count: Number,
    disabled: Boolean,
  },
})

const Factions = model<Faction>('MapFaction', factionSchema)

export default Factions
