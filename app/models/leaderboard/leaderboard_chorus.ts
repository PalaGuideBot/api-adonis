import { model, Schema } from 'mongoose'

interface ChorusData {
  username: string
  value: number
}

interface Chorus {
  date: string
  data: ChorusData[]
}

const leaderboardChorusSchema = new Schema<Chorus>({
  date: { type: String, required: true },
  data: [
    {
      username: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
})

const LeaderboardChorus = model<Chorus>('LeadChorus', leaderboardChorusSchema)

export default LeaderboardChorus
