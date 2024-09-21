import mongoose, { Connection, Schema } from 'mongoose'

interface TrixiumPlayerData {
  username: string
  value: number
}

interface TrixiumPlayer {
  date: string
  newDate: Date
  data: TrixiumPlayerData[]
}

const leaderboardTrixiumPlayerSchema = new Schema<TrixiumPlayer>({
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
const LeaderboardTrixiumPlayer = dbConnection.model<TrixiumPlayer>(
  'leaderboard.trixium.player',
  leaderboardTrixiumPlayerSchema
)

export default LeaderboardTrixiumPlayer
