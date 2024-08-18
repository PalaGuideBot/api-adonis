import { db } from '#core/services/db'
import { Document, InferSchemaType } from 'mongoose'

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)

class LinkRepository {
  async findByDiscordId(discordId: string) {
    return db.minecraftLink.findOne({
      discordId,
    })
  }

  async findByUUID(uuid: string) {
    return db.minecraftLink.findOne({
      minecraftUUID: uuid,
    })
  }

  async findByToken(token: string) {
    return db.minecraftLink.findOne({
      token,
    })
  }

  async findNameByUUID(uuid: string) {
    const player = await db.users.findOne({
      uuid,
    })

    return player?.username ?? 'unknown'
  }

  async removeByDiscordId(discordId: string) {
    return db.minecraftLink.deleteOne({
      discordId,
    })
  }

  async removeByUUID(uuid: string) {
    return db.minecraftLink.deleteOne({
      minecraftUUID: uuid,
    })
  }

  async players() {
    const players = await db.minecraftLink.find()

    const filteredPlayers = players.filter((player) => player.discordId && player.minecraftUUID)
    const playerMap = filteredPlayers.map((player) => ({
      discordId: player.discordId,
      minecraftUUID: player.minecraftUUID,
    }))

    return playerMap
  }

  async generateToken(): Promise<string> {
    const token = nanoid()
    const exists = await this.findByToken(token)
    if (exists) {
      return this.generateToken()
    }
    return token
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

export { LinkRepository }
