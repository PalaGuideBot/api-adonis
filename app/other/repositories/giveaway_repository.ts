import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'

import { db } from '#core/services/db'
import { LinkRepository } from '#link/repositories/link_repository'
import type {
  createGiveawayValidator,
  updateGiveawayValidator,
} from '#other/validators/giveaway_validator'

@inject()
class GiveawayRepository {
  constructor(private linkRepository: LinkRepository) {}

  async findAll() {
    return db.giveaway.find().lean()
  }

  async findById(id: string) {
    try {
      return db.giveaway.findOne({ _id: id }).lean()
    } catch {
      return null
    }
  }

  async findActive() {
    return db.giveaway.findOne().sort({ start: 1 }).lean()
  }

  async create(data: Infer<typeof createGiveawayValidator>) {
    const giveaway = await db.giveaway.create(data)
    return giveaway.toObject()
  }

  async update(id: string, data: Infer<typeof updateGiveawayValidator>) {
    await db.giveaway.updateOne({ _id: id }, data)
    return this.findById(id)
  }

  async delete(id: string) {
    return db.giveaway.deleteOne({ _id: id })
  }

  async addParticipant(id: string, discordId: string) {
    const giveaway = await this.findById(id)
    if (!giveaway) {
      throw new Exception('Giveaway not found', { status: 404 })
    }
    if (giveaway.participants.includes(discordId)) {
      throw new Exception('User already in giveaway', { status: 400 })
    }
    const newParticipants = [...new Set([...giveaway.participants, discordId])]
    await db.giveaway.updateOne({ _id: id }, { participants: newParticipants })
    return await this.findById(id)
  }

  async drawWinners(id: string, count: number) {
    const giveaway = await this.findById(id)
    if (!giveaway) {
      throw new Exception('Giveaway not found', { status: 404 })
    }
    if (giveaway.winners.length > 0) {
      throw new Exception('Winners already drawn', { status: 400 })
    }
    if (giveaway.participants.length < count) {
      throw new Exception('Not enough participants', { status: 400 })
    }

    const links = await this.linkRepository.findPlayers()

    // Augmenter les chances des participants liés
    const weightedParticipants = giveaway.participants.flatMap((participant) =>
      links.some((link) => link.discordId === participant)
        ? Array(3).fill(participant)
        : [participant]
    )

    const winners = []
    for (let i = 0; i < count; i++) {
      const winnerIndex = Math.floor(Math.random() * weightedParticipants.length)
      const winner = weightedParticipants[winnerIndex]

      winners.push(winner)

      // Supprimer toutes les occurrences du gagnant des participants pondérés
      weightedParticipants.splice(
        0,
        weightedParticipants.length,
        ...weightedParticipants.filter((p) => p !== winner)
      )
    }

    await db.giveaway.updateOne({ _id: id }, { winners })
    return await this.findById(id)
  }

  async getUserState(id: string, discordId: string) {
    const giveaway = await this.findById(id)
    if (!giveaway) {
      throw new Exception('Giveaway not found', { status: 404 })
    }

    const participated = giveaway.participants.includes(discordId)
    const linked = await this.linkRepository.findByDiscordId(discordId)

    return { participated, linked: Boolean(linked?.minecraftUUID) }
  }
}

export { GiveawayRepository }
