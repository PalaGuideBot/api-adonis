import { model, Schema } from 'mongoose'

interface FactionData {
  name: string
  value: number
  emblemUrl: string
}

interface Faction {
  date: string
  data: FactionData[]
}

const leaderboardFactionsSchema = new Schema<Faction>({
  date: { type: String, required: true },
  data: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
      emblemUrl: { type: String, required: true },
    },
  ],
})

const LeaderboardFactions = model<Faction>('LeaderboardFactions', leaderboardFactionsSchema)

export default LeaderboardFactions
