import mongoose, { type Connection, Schema } from 'mongoose'

interface JobAlchemistData {
  username: string
  value: number
}

interface JobAlchemist {
  date: string
  newDate: Date
  data: JobAlchemistData[]
}

const leaderboardJobAlchemistSchema = new Schema<JobAlchemist>({
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
const LeaderboardJobAlchemist = dbConnection.model<JobAlchemist>(
  'leaderboard.job.alchemist',
  leaderboardJobAlchemistSchema
)

export default LeaderboardJobAlchemist
