import { db } from '#core/services/db'

class MinecraftRepository {
  async findByUUID(minecraftUUID: string) {
    return db.minecraftLink.findOne({
      minecraftUUID,
    })
  }

  async removeByUUID(minecraftUUID: string) {
    return db.minecraftLink.deleteOne({
      minecraftUUID,
    })
  }
}

export { MinecraftRepository }
