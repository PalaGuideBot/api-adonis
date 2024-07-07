import { model, Schema } from 'mongoose'

interface KothData {
  username: string
  value: number
}

interface Koth {
  date: string
  data: KothData[]
}

const leaderboardKothSchema = new Schema<Koth>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardKoth = model<Koth>('LeadKoth', leaderboardKothSchema)

export default LeaderboardKoth
