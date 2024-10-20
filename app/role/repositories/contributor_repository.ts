import { db } from '#core/services/db'

class ContributorRepository {
  async find(discordId: string) {
    return await db.role.findOne({
      contributor: { $elemMatch: { discordId } },
    })
  }

  async create(discordId: string) {
    return await db.role.updateOne(
      {},
      {
        $push: { contributor: { discordId } },
      },
      { upsert: true }
    )
  }

  async delete(discordId: string) {
    return await db.role.updateOne(
      {},
      {
        $pull: { contributor: { discordId } },
      }
    )
  }

  async list() {
    const role = await db.role.findOne()
    return role?.contributor || []
  }
}

export { ContributorRepository }
