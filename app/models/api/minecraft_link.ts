import mongoose, { Connection, Schema } from 'mongoose'

interface MinecraftLinkData {
  discordId: string
  minecraftUUID?: string
  date: string
  newDate: Date
  token?: string
  expiredAt?: number
}

const minecraftLink = new Schema<MinecraftLinkData>({
  discordId: { type: String, required: true },
  minecraftUUID: { type: String, required: false },
  date: { type: String, required: true },
  newDate: { type: Date, required: true },
  token: { type: String, required: false },
  expiredAt: { type: Number, required: false },
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const MinecraftLink = dbConnection.model<MinecraftLinkData>('link', minecraftLink)

export default MinecraftLink
