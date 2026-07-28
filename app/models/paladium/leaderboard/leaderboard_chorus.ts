import mongoose, { type Connection, Schema } from 'mongoose'

interface ChorusData {
  username: string
  value: number
}

interface Chorus {
  date: string
  newDate: Date
  data: ChorusData[]
}

const leaderboardChorusSchema = new Schema<Chorus>({
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
const LeaderboardChorus = dbConnection.model<Chorus>('leaderboard.chorus', leaderboardChorusSchema)

export default LeaderboardChorus
