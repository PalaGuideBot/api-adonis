import mongoose, { Connection, Schema } from 'mongoose'

interface DuplicateData {
  uuid: string
  date: string
  newDate: Date
}

const duplicateSchema = new Schema<DuplicateData>(
  {
    uuid: { type: String, required: true, index: true },
    date: { type: String, required: true },
    newDate: { type: Date, required: true },
  },
  { timestamps: false }
)

duplicateSchema.index({ uuid: 1 })

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const Duplicate = dbConnection.model<DuplicateData>('duplicate', duplicateSchema, 'duplicates')

export default Duplicate
