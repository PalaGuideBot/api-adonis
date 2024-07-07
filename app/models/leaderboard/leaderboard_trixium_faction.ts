import { model, Schema } from 'mongoose'

interface TrixiumFactionData {
  uuid: string
  value: number
  name: string
  emblemUrl: string
}

interface TrixiumFaction {
  date: string
  data: TrixiumFactionData[]
}

const leaderboardTrixiumFactionSchema = new Schema<TrixiumFaction>({
  date: { type: String, required: true },
  data: [
    {
      uuid: { type: String, required: true },
      value: { type: Number, required: true },
      name: { type: String, required: true },
      emblemUrl: { type: String, required: true },
    },
  ],
})

const LeaderboardTrixiumFaction = model<TrixiumFaction>(
  'LeadTrixFactions',
  leaderboardTrixiumFactionSchema
)

export default LeaderboardTrixiumFaction
