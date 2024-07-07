import { model, Schema } from 'mongoose'

interface ClickerData {
  username: string
  value: number
}

interface Clicker {
  date: string
  data: ClickerData[]
}

const leaderboardClickerSchema = new Schema<Clicker>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardClicker = model<Clicker>('LeadboardClicker', leaderboardClickerSchema)

export default LeaderboardClicker
