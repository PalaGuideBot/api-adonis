import { db } from '#core/services/db'

class StatisticsRepository {
  async findBotStatistics() {
    const bots = await db.bot.find().lean()
    return bots.map((b) => ({
      date: b.date,
      interactionsCount: b.interactions.reduce((acc, interaction) => acc + interaction.count, 0),
      guildsCount: b.guilds.length,
      usersCount: b.guilds.reduce((acc, guild) => acc + guild.memberCount, 0),
      interactions: b.interactions,
      guilds: b.guilds.map((g) => ({
        id: g.id,
        name: g.name,
        memberCount: g.memberCount,
        icon: g.icon || '',
      })),
    }))
  }

  async findEndpointAndKeyStatistics() {
    const endpointsAndKeys = await db.endpointAndKey.find().lean()

    return endpointsAndKeys.map((y) => ({
      date: y.date,
      endpoints: y.endpoints.map((e) => ({
        name: e.endpoint,
        count: e.count,
        averageTime:
          e.time.length > 0 ? e.time.reduce((acc, time) => acc + time, 0) / e.time.length : 0,
        minTime: e.time.length > 0 ? Math.min(...e.time) : 0,
        maxTime: e.time.length > 0 ? Math.max(...e.time) : 0,
      })),
      keys: y.keys.map((k) => ({
        key: k.key,
        count: k.count,
        ip: k.ip.length,
      })),
    }))
  }

  async uniquePlayersByDate(): Promise<
    {
      _id: string
      count: number
    }[]
  > {
    return await db.users.aggregate([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  }

  async uniqueFactionsByDate(): Promise<
    {
      _id: string
      count: number
    }[]
  > {
    return await db.factions.aggregate([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  }

  async findStatistics() {
    const bots = await this.findBotStatistics()
    const endpointAndKeys = await this.findEndpointAndKeyStatistics()
    const uniquePlayerInDataBase = await this.uniquePlayersByDate()
    const uniqueFactionInDataBase = await this.uniqueFactionsByDate()

    const result: {
      date: string
      interactionsCount: number
      guildsCount: number
      usersCount: number
      interactions: {
        name: string
        count: number
      }[]
      guilds: {
        id: string
        name: string
        memberCount: number
        icon: string
      }[]
      endpoints: {
        name: string
        count: number
        averageTime: number
        minTime: number
        maxTime: number
      }[]
      keys: {
        key: string
        count: number
        ip: number
      }[]
      uniquePlayerInDataBase: number
      uniqueFactionInDataBase: number
    }[] = []

    const dates = [
      ...new Set([
        ...bots.map((b) => b.date),
        ...endpointAndKeys.map((e) => e.date),
        ...uniquePlayerInDataBase.map((u) => u._id),
        ...uniqueFactionInDataBase.map((g) => g._id),
      ]),
    ]

    dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    dates.forEach((date, index) => {
      const bot = bots.find((b) => b.date === date)
      const endpointAndKey = endpointAndKeys.find((e) => e.date === date)
      const uniquePlayer = uniquePlayerInDataBase.find((u) => u._id === date)
      const uniqueGuild = uniqueFactionInDataBase.find((g) => g._id === date)

      result.push({
        date,
        interactionsCount: bot?.interactionsCount || 0,
        guildsCount: bot?.guildsCount || 0,
        usersCount: bot?.usersCount || 0,
        interactions: bot?.interactions || [],
        guilds: index === 0 ? bot?.guilds || [] : [],
        endpoints: endpointAndKey?.endpoints || [],
        keys: endpointAndKey?.keys || [],
        uniquePlayerInDataBase: uniquePlayer?.count || 0,
        uniqueFactionInDataBase: uniqueGuild?.count || 0,
      })
    })

    return result
  }
}

export { StatisticsRepository }
