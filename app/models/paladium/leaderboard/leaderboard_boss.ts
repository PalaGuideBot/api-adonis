import mongoose, { Connection, Schema } from 'mongoose'

interface BossData {
  username: string
  value: number
}

interface Boss {
  date: string
  newDate: Date
  data: BossData[]
}

const leaderboardBossSchema: Schema = new Schema<Boss>({
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
const LeaderboardBoss = dbConnection.model<Boss>('leaderboard.boss', leaderboardBossSchema)

export default LeaderboardBoss
