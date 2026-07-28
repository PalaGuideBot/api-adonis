import mongoose, { type Connection, Schema } from 'mongoose'

interface JobHunterData {
  username: string
  value: number
}

interface JobHunter {
  date: string
  newDate: Date
  data: JobHunterData[]
}

const leaderboardJobHunterSchema = new Schema<JobHunter>({
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
const LeaderboardJobHunter = dbConnection.model<JobHunter>(
  'leaderboard.job.hunter',
  leaderboardJobHunterSchema
)

export default LeaderboardJobHunter
