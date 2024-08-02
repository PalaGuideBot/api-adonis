import { db } from '#core/services/db'
import { Document, InferSchemaType } from 'mongoose'

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)

class TokenRepository {
  async generateToken(): Promise<string> {
    const token = nanoid()
    const exists = await this.findByToken(token)
    if (exists) {
      return this.generateToken()
    }
    return token
  }

  async findByDiscordId(discordId: string) {
    return db.minecraftLink.findOne({
      discordId,
    })
  }

  async findByToken(token: string) {
    return db.minecraftLink.findOne({
      token,
    })
  }

  async findByMinecraftUUID(minecraftUUID: string) {
    return db.minecraftLink.findOne({
      minecraftUUID,
    })
  }

  async create(payload: InferSchemaType<typeof db.minecraftLink.schema>) {
    const link = new db.minecraftLink(payload)
    await link.save()
    return link
  }

  async update(
    document: Document<unknown, {}, InferSchemaType<typeof db.minecraftLink.schema>>,
    payload: Partial<InferSchemaType<typeof db.minecraftLink.schema>>
  ) {
    document.set(payload)
    await document.save()
    return document
  }
}

export { TokenRepository }
