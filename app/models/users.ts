import { model, Schema } from 'mongoose'

interface UserLeaderboard {
  boss: number
  money: number
  end: number
  koth: number
  chorus: number
  egghunt: number
  corruption: number
  clicker: number
  trixium: number
  job_alchemist: number
  job_farmer: number
  job_hunter: number
  job_miner: number
}

interface UserAchievements {
  completed: number
  incomplete: number
}

interface User {
  uuid: string
  username: string
  leaderboard: UserLeaderboard
  achievements: UserAchievements
}

const userSchema: Schema = new Schema<User>({
  uuid: { type: String, required: true },
  username: { type: String, required: true },
  leaderboard: {
    boss: Number,
    money: Number,
    end: Number,
    koth: Number,
    chorus: Number,
    egghunt: Number,
    corruption: Number,
    clicker: Number,
    trixium: Number,
    job_alchemist: Number,
    job_farmer: Number,
    job_hunter: Number,
    job_miner: Number,
  },
  achievements: {
    completed: Number,
    incomplete: Number,
  },
})

const Users = model<User>('Users', userSchema)

export default Users
