import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { DiscordService } from '#core/services/discord'

export default class SyncUsers extends BaseCommand {
  static commandName = 'sync:users'
  static description = ''

  protected prefix = 'SyncUsers'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(discordService: DiscordService) {
    const now = DateTime.now().toSQLDate()

    const users = await db.user
      .find({
        lastUpdated: { $ne: now },
      })
      .lean()

    const bulkOperations = []

    for (const user of users) {
      try {
        const data = await discordService.getUser(user.discordId)

        bulkOperations.push({
          updateOne: {
            filter: { discordId: user.discordId },
            update: {
              $set: {
                username: data.username,
                avatarUrl: data.avatarUrl,
                lastUpdated: now,
              },
            },
            upsert: true,
          },
        })
      } catch {
        this.logger.warning(`${this.prefix}: Failed to fetch user ${user.discordId}`)
      }
    }

    if (bulkOperations.length > 0) {
      await db.user.bulkWrite(bulkOperations)
      this.logger.info(`${this.prefix}: Synced ${bulkOperations.length} users`)
    } else {
      this.logger.info(`${this.prefix}: No users to sync`)
    }
  }
}
