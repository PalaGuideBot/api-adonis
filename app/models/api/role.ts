import mongoose, { Connection, Schema } from 'mongoose'

interface User {
  discordId: string
}

interface RoleModel {
  staff: User[]
  contributor: User[]
}

const roleShema = new Schema<RoleModel>({
  staff: [{ discordId: String }],
  contributor: [{ discordId: String }],
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const Role = dbConnection.model<RoleModel>('role', roleShema)

export default Role
