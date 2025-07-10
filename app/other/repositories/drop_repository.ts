import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import type { createDropValidator, updateDropValidator } from '#other/validators/drop_validator'

@inject()
class DropRepository {
  constructor() {}

  async findAll() {
    const drops = await db.drop.find().lean()
    return drops
  }

  async findById(id: string) {
    try {
      return db.drop.findOne({ _id: id }).lean()
    } catch {
      return null
    }
  }

  async findActive() {
    const drop = await db.drop.findOne({ active: true }).lean()
    return drop
  }

  async checkActive() {
    const exists = await db.drop.exists({ active: true })
    return exists !== null
  }

  async create(data: Infer<typeof createDropValidator>) {
    const drop = await db.drop.create({ ...data, active: false, winners: [] })
    return drop.toObject()
  }

  async update(id: string, data: Infer<typeof updateDropValidator>) {
    await db.drop.updateOne({ _id: id }, data)
    return this.findById(id)
  }

  async delete(id: string) {
    return db.drop.deleteOne({ _id: id })
  }

  async addParticipant(id: string, discordId: string) {
    const drop = await this.findById(id)
    if (!drop) {
      throw new Exception('Drop not found', { status: 404 })
    }
    if (drop.participants.includes(discordId)) {
      throw new Exception('User already in drop', { status: 400 })
    }
    if (DateTime.now().toMillis() > DateTime.fromJSDate(drop.end).toMillis()) {
      throw new Exception('Drop has ended', { status: 400 })
    }
    const newParticipants = [...new Set([...drop.participants, discordId])]
    await db.drop.updateOne({ _id: id }, { participants: newParticipants })
    return await this.findById(id)
  }

  async addWinner(id: string, discordId: string) {
    const drop = await this.findById(id)
    if (!drop) {
      throw new Exception('Drop not found', { status: 404 })
    }
    if (drop.winners.includes(discordId)) {
      throw new Exception('User already won this drop', { status: 400 })
    }
    const newWinners = [...new Set([...drop.winners, discordId])]
    await db.drop.updateOne({ _id: id }, { winners: newWinners })
    return await this.findById(id)
  }
}

export { DropRepository }
