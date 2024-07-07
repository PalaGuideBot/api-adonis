import { model, Schema } from 'mongoose'

interface TrixiumUserData {
  username: string
  value: number
}

interface TrixiumUser {
  date: string
  data: TrixiumUserData[]
}

const leaderboardTrixiumUserSchema = new Schema<TrixiumUser>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardTrixiumUser = model<TrixiumUser>(
  'LeaderboardTrixiumUser',
  leaderboardTrixiumUserSchema
)

export default LeaderboardTrixiumUser
