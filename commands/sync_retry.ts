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
    const players = await db.players.find({
      retry: {
        count: { $gt: 0 },
      },
    })

    const bulkOperationsPlayers = []

    for (const player of players) {
      const id = player._id

      bulkOperationsPlayers.push({
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

    const factions = await db.factions.find({
      'retry.count': { $gt: 0 },
    })

    const bulkOperationsFactions = []

    for (const faction of factions) {
      const id = faction._id

      bulkOperationsFactions.push({
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

    this.logger.info(`Found ${bulkOperationsPlayers.length} players to retry`, {
      prefix: this.prefix,
    })
    this.logger.info(`Found ${bulkOperationsFactions.length} factions to retry`, {
      prefix: this.prefix,
    })

    if (bulkOperationsPlayers.length > 0) {
      await db.players.bulkWrite(bulkOperationsPlayers)
    }
    if (bulkOperationsFactions.length > 0) {
      await db.factions.bulkWrite(bulkOperationsFactions)
    }
  }
}
