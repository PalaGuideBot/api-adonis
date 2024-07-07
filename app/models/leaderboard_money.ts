import { model, Schema } from 'mongoose'

interface MoneyData {
  username: string
  value: number
}

interface Money {
  date: string
  data: MoneyData[]
}

const moneySchema = new Schema<Money>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardMoney = model<Money>('LeaderboardMoney', moneySchema)

export default LeaderboardMoney
