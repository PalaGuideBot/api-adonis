import { db } from '#core/services/db'

class StatusRepository {
  async get() {
    const status = await db.paladiumStatus.find().lean()
    return status
  }
}

export { StatusRepository }
