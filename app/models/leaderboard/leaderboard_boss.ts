import { model, Schema } from 'mongoose'

interface BossData {
  username: string
  value: number
}

interface Boss {
  date: string
  data: BossData[]
}

const leaderboardBossSchema: Schema = new Schema<Boss>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardBoss = model<Boss>('LeadBoss', leaderboardBossSchema)

export default LeaderboardBoss
