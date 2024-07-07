import { model, Schema } from 'mongoose'

interface MinecraftLinkData {
  discordId: string
  minecraftUUID: string
  date: string
  token: string
  expiredAt: string
}

const minecraftLink = new Schema<MinecraftLinkData>({
  discordId: { type: String, required: true },
  minecraftUUID: { type: String, required: true },
  date: { type: String, required: true },
  token: { type: String, required: true },
  expiredAt: { type: String, required: true },
})

const MinecraftLink = model<MinecraftLinkData>('MinecraftLink', minecraftLink)

export default MinecraftLink
