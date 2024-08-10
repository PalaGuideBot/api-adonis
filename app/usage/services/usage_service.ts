import { inject } from '@adonisjs/core'
import { InferSchemaType } from 'mongoose'

import { BotRepository } from '#bot/repositories/bot_repository'
import { db } from '#core/services/db'
import { FactionRepository } from '#unique/repositories/faction_repository'
import { PlayerRepository } from '#unique/repositories/player_repository'
import { EndpointAndKeyRepository } from '#usage/repositories/endpoint_and_key_repository'

type Bot = InferSchemaType<typeof db.bot.schema>

type Statistic = {
  date: string
  interactionsCount: number
  guildsCount: number
  usersCount: number
  interactions: Bot['interactions']
  guilds: Bot['guilds']
  endpoints: Awaited<ReturnType<EndpointAndKeyRepository['findStatistics']>>[number]['endpoints']
  keys: Awaited<ReturnType<EndpointAndKeyRepository['findStatistics']>>[number]['keys']
  playerCount: number
  factionCount: number
}

@inject()
class UsageService {
  constructor(
    private botRepository: BotRepository,
    private endpointAndKeyRepository: EndpointAndKeyRepository,
    private playerRepository: PlayerRepository,
    private factionRepository: FactionRepository
  ) {}

  async getStatistics() {
    const bots = await this.botRepository.findStatistics()
    const endpointAndKeys = await this.endpointAndKeyRepository.findStatistics()
    const playersCountByDates = await this.playerRepository.countByDate()
    const factionsCountByDates = await this.factionRepository.countByDate()

    const result: Statistic[] = []

    const dates = Array.from(
      new Set([
        ...bots.map((bot) => bot.date),
        ...endpointAndKeys.map((endpointAndKey) => endpointAndKey.date),
        ...playersCountByDates.map((player) => player._id),
        ...factionsCountByDates.map((faction) => faction._id),
      ])
    ).toSorted((a, b) => new Date(b).getTime() - new Date(a).getTime())

    dates.forEach((date, index) => {
      const bot = bots.find((b) => b.date === date)
      const endpointAndKey = endpointAndKeys.find((e) => e.date === date)
      const player = playersCountByDates.find((u) => u._id === date)
      const faction = factionsCountByDates.find((g) => g._id === date)

      result.push({
        date,
        interactionsCount: bot?.interactionsCount || 0,
        guildsCount: bot?.guildsCount || 0,
        usersCount: bot?.usersCount || 0,
        interactions: bot?.interactions || [],
        guilds: index === 0 ? bot?.guilds || [] : [],
        endpoints: endpointAndKey?.endpoints || [],
        keys: endpointAndKey?.keys || [],
        playerCount: player?.count || 0,
        factionCount: faction?.count || 0,
      })
    })

    return result
  }
}

export { UsageService }
