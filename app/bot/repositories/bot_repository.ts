import { Document, InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'

class BotRepository {
  async findByDate(date: string) {
    return db.bot.findOne({
      date: date,
    })
  }

  async create(payload: InferSchemaType<typeof db.bot.schema>) {
    const bot = new db.bot(payload)
    await bot.save()
    return bot
  }

  async update(
    document: Document<unknown, {}, InferSchemaType<typeof db.bot.schema>>,
    payload: Partial<InferSchemaType<typeof db.bot.schema>>
  ) {
    document.set(payload)
    await document.save()
    return document
  }

  async findStatistics() {
    const bots = await db.bot.find().lean()
    return bots.map((bot) => ({
      date: bot.date,
      newDate: bot.newDate,
      interactionsCount: bot.interactions.reduce((acc, interaction) => acc + interaction.count, 0),
      guildsCount: bot.guilds.length,
      usersCount: bot.users ?? 0,
      interactions: bot.interactions,
      guilds: bot.guilds.map((guild) => ({
        id: guild.id,
        name: guild.name,
        memberCount: guild.memberCount,
        icon: guild.icon || '',
      })),
    }))
  }

  async findLastStatistics() {
    const lastBot = await db.bot.findOne().sort({ _id: -1 }).limit(1)

    if (!lastBot) return { guildsCount: 0, usersCount: 0 }
    else {
      const guildsCount = lastBot.guilds.length
      const usersCount = lastBot.users ?? 0

      return {
        guildsCount,
        usersCount,
      }
    }
  }
}

export { BotRepository }
