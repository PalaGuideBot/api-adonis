import mongoose, { Connection, Schema } from 'mongoose'

interface User {
  discordId: string
  roles: string[]
}

const userSchema = new Schema<User>({
  discordId: String,
  roles: [String],
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const User = dbConnection.model<User>('user', userSchema)

export default User
