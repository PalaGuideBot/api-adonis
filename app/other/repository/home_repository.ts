import { db } from '#core/services/db'

class HomeRepository {
  async get() {
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

export { HomeRepository }
