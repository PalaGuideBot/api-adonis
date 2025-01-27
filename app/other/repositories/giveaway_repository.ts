import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { DiscordService } from '#core/services/discord'
import { LinkRepository } from '#link/repositories/link_repository'
import type {
  createGiveawayValidator,
  updateGiveawayValidator,
} from '#other/validators/giveaway_validator'
import { UserRepository } from '#user/repositories/user_repository'

@inject()
class GiveawayRepository {
  constructor(
    private linkRepository: LinkRepository,
    private userRepository: UserRepository,
    private discordService: DiscordService
  ) {}

  async findAll() {
    const giveaways = await db.giveaway.find().lean()

    const ids = giveaways.flatMap((giveaway) => [...giveaway.participants, ...giveaway.winners])
    const parsedUsers = await this.parseUsers(ids)

    return giveaways.map((giveaway) => this.parseGiveaway(giveaway, parsedUsers))
  }

  async findById(id: string) {
    try {
      return db.giveaway.findOne({ _id: id }).lean()
    } catch {
      return null
    }
  }

  async findActive() {
    const giveaway = await db.giveaway.findOne({ active: true }).lean()

    const ids = giveaway ? [...giveaway.participants, ...giveaway.winners] : []
    const parsedUsers = await this.parseUsers(ids)

    return giveaway ? this.parseGiveaway(giveaway, parsedUsers) : null
  }

  async checkActive() {
    const exists = await db.giveaway.exists({ active: true })
    return exists !== null
  }

  async create(data: Infer<typeof createGiveawayValidator>) {
    const giveaway = await db.giveaway.create({ ...data, active: false })
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
    if (DateTime.now().toMillis() > DateTime.fromJSDate(giveaway.end).toMillis()) {
      throw new Exception('Giveaway has ended', { status: 400 })
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

  private async parseUsers(ids: string[]) {
    if (ids.length === 0) {
      return []
    }

    let users = await this.userRepository.findAll()
    users = users.filter((user) => ids.includes(user.discordId))
    return await Promise.all(
      users.map(async (user) => {
        const { id, ...discordUser } = await this.discordService.getUser(user.discordId)
        return { ...user, ...discordUser }
      })
    )
  }

  private parseGiveaway(
    giveaway: Awaited<ReturnType<typeof this.findById>>,
    users: Awaited<ReturnType<typeof this.parseUsers>>
  ) {
    if (!giveaway) {
      return null
    }
    return {
      ...giveaway,
      participants: giveaway.participants.map(
        (participant) => users.find((user) => user.discordId === participant)!
      ),
      winners: giveaway.winners.map((winner) => users.find((user) => user.discordId === winner)!),
    }
  }
}

export { GiveawayRepository }
