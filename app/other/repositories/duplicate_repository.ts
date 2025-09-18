import { DateTime } from 'luxon'

import { db } from '#core/services/db'

type CreatePayload = { uuid: string }

class DuplicateRepository {
  async add(payload: CreatePayload) {
    const exists = await db.duplicate.findOne({ uuid: payload.uuid })
    if (exists) return exists

    const now = DateTime.now()
    const doc = new db.duplicate({
      uuid: payload.uuid,
      date: now.toFormat('yyyy-MM-dd'),
      newDate: now.toJSDate(),
    })
    await doc.save()
    return doc
  }

  async list(limit = 100) {
    return db.duplicate.find().sort({ newDate: 1 }).limit(limit)
  }
}

export { DuplicateRepository }
