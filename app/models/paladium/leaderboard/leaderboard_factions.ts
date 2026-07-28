import mongoose, { type Connection, Schema } from 'mongoose'

interface FactionData {
  name: string
  value: number
  emblemUrl?: string
}

interface Faction {
  date: string
  newDate: Date
  data: FactionData[]
}

const factionSchema = new Schema<Faction>({
  date: { type: String, required: true },
  newDate: { type: Date, required: true },
  data: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
      emblemUrl: { type: String },
    },
  ],
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const LeaderboardFactions = dbConnection.model<Faction>('leaderboard.factions', factionSchema)

export default LeaderboardFactions
