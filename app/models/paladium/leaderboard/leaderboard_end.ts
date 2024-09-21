import mongoose, { Connection, Schema } from 'mongoose'

interface EndData {
  username: string
  value: number
}

interface End {
  date: string
  data: EndData[]
}

const leaderboardEndSchema = new Schema<End>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const LeadearboardEnd = dbConnection.model<End>('leaderboard.end', leaderboardEndSchema)

export default LeadearboardEnd
