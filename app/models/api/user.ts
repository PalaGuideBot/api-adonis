import mongoose, { type Connection, Schema } from 'mongoose'

interface User {
  discordId: string
  username: string
  avatarUrl: string
  roles: string[]
  lastUpdated: string
}

const userSchema = new Schema<User>({
  discordId: String,
  username: String,
  avatarUrl: String,
  lastUpdated: String,
  roles: [String],
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const User = dbConnection.model<User>('user', userSchema)

export default User
