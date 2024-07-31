import { db } from '#core/services/db'
import { Document, InferSchemaType } from 'mongoose'

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
    const lastBot = await db.bot.findOne().sort({ _id: -1 }).limit(1)

    if (!lastBot) return { guildsCount: 0, usersCount: 0 }
    else {
      const guildsCount = lastBot.guilds.length
      const usersCount = lastBot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0)

      return {
        guildsCount,
        usersCount,
      }
    }
  }
}

export { BotRepository }
