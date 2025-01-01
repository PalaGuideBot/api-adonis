import mongoose, { Connection, Schema } from 'mongoose'

interface GiveawayData {
  title: string
  active: boolean
  start: Date
  end: Date
  prizes: string[]
  participants: string[]
  winners: string[]
}

const GiveawaySchema = new Schema<GiveawayData>({
  title: { type: String, required: true },
  active: { type: Boolean, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  prizes: { type: [String], required: true },
  participants: { type: [String], required: true },
  winners: { type: [String], required: true },
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const Giveaway = dbConnection.model<GiveawayData>('giveaway', GiveawaySchema)

export default Giveaway
