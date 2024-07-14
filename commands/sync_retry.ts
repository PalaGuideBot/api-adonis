import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'

export default class SyncRetry extends BaseCommand {
  static commandName = 'sync:retry'
  static description = ''

  protected prefix = 'SyncRetry'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run() {
    this.logger.info('Syncing retry...', { prefix: this.prefix })

    const players = await db.users.find({
      retry: {
        count: { $gt: 0 },
      },
    })

    const bulkOperations = []

    for (const player of players) {
      const id = player._id

      bulkOperations.push({
        updateOne: {
          filter: { _id: id },
          update: {
            $set: {
              retry: {
                count: 0,
                disabled: false,
              },
            },
          },
        },
      })
    }

    if (bulkOperations.length > 0) {
      await db.users.bulkWrite(bulkOperations)
      this.logger.info('Synced retry', { prefix: this.prefix })
    } else {
      this.logger.info('No retry to sync', { prefix: this.prefix })
    }
  }
}
