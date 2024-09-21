import mongoose, { Connection, Schema } from 'mongoose'

interface MoneyData {
  username: string
  value: number
}

interface Money {
  date: string
  newDate: Date
  data: MoneyData[]
}

const moneySchema = new Schema<Money>({
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
const LeaderboardMoney = dbConnection.model<Money>('leaderboard.money', moneySchema)

export default LeaderboardMoney
