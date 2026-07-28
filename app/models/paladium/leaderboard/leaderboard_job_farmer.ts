import mongoose, { type Connection, Schema } from 'mongoose'

interface JobFarmerData {
  username: string
  value: number
}

interface JobFarmer {
  date: string
  newDate: Date
  data: JobFarmerData[]
}

const leaderboardJobFarmerSchema = new Schema<JobFarmer>({
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
const LeaderboardJobFarmer = dbConnection.model<JobFarmer>(
  'leaderboard.job.farmer',
  leaderboardJobFarmerSchema
)

export default LeaderboardJobFarmer
