import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'

export default class SyncLink extends BaseCommand {
  static commandName = 'sync:link'
  static description = ''

  protected prefix = 'SyncLink'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run() {
    this.logger.info('Syncing link...', { prefix: this.prefix })

    const linkedAccount = await db.minecraftLink.find({
      minecraftUUID: { $exists: false },
      expiredAt: { $lt: Date.now() },
    })

    const bulkOperations = []

    for (const account of linkedAccount) {
      bulkOperations.push({
        deleteOne: {
          filter: { _id: account._id },
        },
      })
    }

    if (bulkOperations.length > 0) {
      await db.minecraftLink.bulkWrite(bulkOperations)
      this.logger.info(`${bulkOperations.length} link(s) deleted !`, { prefix: this.prefix })
    } else {
      this.logger.info('No link to delete', { prefix: this.prefix })
    }
  }
}
