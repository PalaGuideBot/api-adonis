import mongoose, { Connection, Schema } from 'mongoose'

interface EggHuntData {
  username: string
  value: number
}

interface EggHunt {
  date: string
  data: EggHuntData[]
}

const leaderboardEggHuntSchema = new Schema<EggHunt>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const LeaderboardEggHunt = dbConnection.model<EggHunt>(
  'leaderboard.egghunt',
  leaderboardEggHuntSchema
)

export default LeaderboardEggHunt
