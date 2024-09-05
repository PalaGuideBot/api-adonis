import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'

export default class SyncDuplicatePlayerDate extends BaseCommand {
  static commandName = 'sync:duplicate_player_date'
  static description = ''

  protected prefix = 'SyncDuplicatePlayerDate'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const players = await db.users.find().lean()

    const duplicate = []

    for (const player of players) {
      if (Array.isArray(player.data) && player.data.length > 1) {
        const dates = player.data.map((d) => d.date)
        // Si des doublons existent dans les dates
        if (dates.length !== new Set(dates).size) {
          duplicate.push({ uuid: player.uuid, id: player._id })
        }
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate players`)

    const bulkOperations = []

    for (const player of duplicate) {
      const playerData = await db.users.findOne({ uuid: player.uuid }).lean()
      if (!playerData || !Array.isArray(playerData.data)) continue

      const seenDates = new Set()
      const newPlayerData = []

      for (const entry of playerData.data) {
        if (!seenDates.has(entry.date)) {
          newPlayerData.push(entry)
          seenDates.add(entry.date)
        }
      }

      bulkOperations.push({
        updateOne: {
          filter: { uuid: player.uuid },
          update: { $set: { data: newPlayerData } },
        },
      })
    }

    if (bulkOperations.length > 0) {
      try {
        await db.users.bulkWrite(bulkOperations)
        this.logger.info('Bulk update operations completed successfully')
      } catch (error) {
        this.logger.error('Error during bulk update operations', error)
      }
    } else {
      this.logger.info('No players to update')
    }
  }
}
