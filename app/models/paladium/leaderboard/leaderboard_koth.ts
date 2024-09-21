import mongoose, { Connection, Schema } from 'mongoose'

interface KothData {
  username: string
  value: number
}

interface Koth {
  date: string
  newDate: Date
  data: KothData[]
}

const leaderboardKothSchema = new Schema<Koth>({
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
const LeaderboardKoth = dbConnection.model<Koth>('leaderboard.koth', leaderboardKothSchema)

export default LeaderboardKoth
