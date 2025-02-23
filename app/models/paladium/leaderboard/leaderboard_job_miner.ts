import mongoose, { Connection, Schema } from 'mongoose'

interface JobMinerData {
  username: string
  value: number
}

interface JobMiner {
  date: string
  newDate: Date
  data: JobMinerData[]
}

const leaderboardJobMinerSchema = new Schema<JobMiner>({
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
const LeaderboardJobMiner = dbConnection.model<JobMiner>(
  'leaderboard.job.miner',
  leaderboardJobMinerSchema
)

export default LeaderboardJobMiner
