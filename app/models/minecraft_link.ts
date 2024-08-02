import { model, Schema } from 'mongoose'

interface MinecraftLinkData {
  discordId: string
  minecraftUUID?: string
  date: string
  token?: string
  expiredAt?: number
}

const minecraftLink = new Schema<MinecraftLinkData>({
  discordId: { type: String, required: true },
  minecraftUUID: { type: String, required: false },
  date: { type: String, required: true },
  token: { type: String, required: false },
  expiredAt: { type: Number, required: false },
})

const MinecraftLink = model<MinecraftLinkData>('MinecraftLink', minecraftLink)

export default MinecraftLink
