import { model, Schema } from 'mongoose'

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

const LeadearboardEnd = model<End>('LeadEnd', leaderboardEndSchema)

export default LeadearboardEnd
