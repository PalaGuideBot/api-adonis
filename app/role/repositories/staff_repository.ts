import { db } from '#core/services/db'

class StaffRepository {
  async find(discordId: string) {
    return await db.role.findOne({
      staff: { $elemMatch: { discordId } },
    })
  }

  async create(discordId: string) {
    return await db.role.updateOne(
      {},
      {
        $push: { staff: { discordId } },
      },
      { upsert: true }
    )
  }

  async delete(discordId: string) {
    return await db.role.updateOne(
      {},
      {
        $pull: { staff: { discordId } },
      }
    )
  }

  async list() {
    const role = await db.role.findOne()
    return role?.staff || []
  }
}

export { StaffRepository }
