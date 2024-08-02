import { db } from '#core/services/db'

class DiscordRepository {
  async findByDiscordId(discordId: string) {
    return db.minecraftLink.findOne({
      discordId,
    })
  }

  async findNameByMinecraftUUID(minecraftUUID: string) {
    const player = await db.users.findOne({
      uuid: minecraftUUID,
    })

    return player?.username ?? 'unknown'
  }

  async removeByDiscordId(discordId: string) {
    return db.minecraftLink.deleteOne({
      discordId,
    })
  }
}

export { DiscordRepository }
