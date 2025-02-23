import mongoose, { Connection, Schema } from 'mongoose'

interface AllianceData {
  username: string
  value: number
}

interface Alliance {
  date: string
  newDate: Date
  data: AllianceData[]
}

const leaderboardAllianceSchema = new Schema<Alliance>({
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
const LeaderboardAlliance = dbConnection.model<Alliance>(
  'leaderboard.alliance',
  leaderboardAllianceSchema
)

export default LeaderboardAlliance
