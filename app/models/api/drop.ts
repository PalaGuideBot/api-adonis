import mongoose, { Connection, Schema } from 'mongoose'

interface DropData {
  title: string
  active: boolean
  start: Date
  end: Date
  prize: string
  slices: number
  participants: string[]
  winners: string[]
}

const DropSchema = new Schema<DropData>({
  title: { type: String, required: true },
  active: { type: Boolean, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  prize: { type: String, required: true },
  slices: { type: Number, required: true },
  participants: { type: [String], required: true },
  winners: { type: [String], required: true },
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const Drop = dbConnection.model<DropData>('drop', DropSchema)

export default Drop
