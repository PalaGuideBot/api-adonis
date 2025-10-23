import mongoose, { Connection, Schema } from 'mongoose'

interface SyncStateData {
  key: string
  value: Record<string, any>
  updatedAt: Date
}

const syncStateSchema = new Schema<SyncStateData>({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, required: true, default: Date.now },
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const SyncState = dbConnection.model<SyncStateData>(
  'sync_state',
  syncStateSchema,
  'sync_states'
)

export default SyncState
