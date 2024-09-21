import mongoose, { Connection, Schema } from 'mongoose'

interface ClickerData {
  username: string
  value: number
}

interface Clicker {
  date: string
  newDate: Date
  data: ClickerData[]
}

const leaderboardClickerSchema = new Schema<Clicker>({
  date: { type: String, required: true },
  newDate: { type: Date, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const LeaderboardClicker = dbConnection.model<Clicker>(
  'leaderboard.clicker',
  leaderboardClickerSchema
)

export default LeaderboardClicker
