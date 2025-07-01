import mongoose, { Connection, Schema } from 'mongoose'

interface PlayerWrappedInterface {
  uuid: string
  username: string
  achievements: {
    completed: number
    total: number
  }
  mount?: {
    mountType: number
    name: string
    level: number
  }
  pet?: {
    currentSkin: string
    level: number
  }
  friends: number
  faction: {
    name: string
    alliance?: 'ORDER' | 'CHAOS'
    emblemUrl?: string
  }
  factionsCount: number
  timePlayed: number
  jobs: {
    miner: number
    farmer: number
    hunter: number
    alchemist: number
  }
  moneyMax: number
  bestLeaderboard?: {
    name: string
    value: number
  } | null
  clicker: {
    production: number
    rps: number
    buildings: {
      lastUnlocked?: {
        name: string
        label: string
      }
      unlocked: number
      total: number
    }
    upgrades: {
      unlocked: number
      total: number
    }
  }
}

const playerWrappedSchema: Schema = new Schema<PlayerWrappedInterface>({
  uuid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  achievements: {
    completed: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  mount: {
    mountType: { type: Number, required: false },
    name: { type: String, required: false },
    level: { type: Number, required: false },
  },
  pet: {
    currentSkin: { type: String, required: false },
    level: { type: Number, required: false },
  },
  friends: { type: Number, required: true },
  faction: {
    name: { type: String, required: true },
    alliance: { type: String, enum: ['ORDER', 'CHAOS'], required: false },
    emblemUrl: { type: String, required: false },
  },
  factionsCount: { type: Number, required: true },
  timePlayed: { type: Number, required: true },
  jobs: {
    miner: { type: Number, required: true },
    farmer: { type: Number, required: true },
    hunter: { type: Number, required: true },
    alchemist: { type: Number, required: true },
  },
  moneyMax: { type: Number, required: true },
  bestLeaderboard: {
    name: { type: String, required: false },
    value: { type: Number, required: false },
  },
  clicker: {
    production: { type: Number, required: true },
    rps: { type: Number, required: true },
    buildings: {
      lastUnlocked: {
        name: { type: String, required: false },
        label: { type: String, required: false },
      },
      unlocked: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    upgrades: {
      unlocked: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  },
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const PlayerWrapped = dbConnection.model<PlayerWrappedInterface>(
  'unique.player.wrapped',
  playerWrappedSchema
)

export default PlayerWrapped
