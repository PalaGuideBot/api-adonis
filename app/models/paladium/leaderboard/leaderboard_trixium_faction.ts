import mongoose, { Connection, Schema } from 'mongoose'

interface TrixiumFactionData {
  uuid: string
  value: number
  name: string
  emblemUrl: string
}

interface TrixiumFaction {
  date: string
  newDate: Date
  data: TrixiumFactionData[]
}

const leaderboardTrixiumFactionSchema = new Schema<TrixiumFaction>({
  date: { type: String, required: true },
  newDate: { type: Date, required: true },
  data: [
    {
      uuid: { type: String, required: true },
      value: { type: Number, required: true },
      name: { type: String },
      emblemUrl: { type: String },
    },
  ],
})

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const LeaderboardTrixiumFaction = dbConnection.model<TrixiumFaction>(
  'leaderboard.trixium.faction',
  leaderboardTrixiumFactionSchema
)

export default LeaderboardTrixiumFaction
