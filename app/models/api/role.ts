import mongoose, { type Connection, Schema } from 'mongoose'

interface Role {
  name: string
  label: string
  priority: number
  description: string
}

const roleSchema = new Schema<Role>({
  name: String,
  label: String,
  priority: Number,
  description: String,
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const Role = dbConnection.model<Role>('role', roleSchema)

export default Role
