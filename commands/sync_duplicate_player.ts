import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'

export default class SyncDuplicatePlayer extends BaseCommand {
  static commandName = 'sync:duplicate_player'
  static description = ''

  protected prefix = 'SyncDuplicatePlayer'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const players = await db.players.find().lean()

    const uuidMap = new Map()

    for (const player of players) {
      if (!uuidMap.has(player.uuid)) {
        uuidMap.set(player.uuid, [])
      }
      uuidMap.get(player.uuid).push(player)
    }

    const duplicate = []
    for (const [, playersWithSameUuid] of uuidMap.entries()) {
      if (playersWithSameUuid.length > 1) {
        duplicate.push(playersWithSameUuid)
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate players`)

    const bulkOperations = []

    for (const playersWithSameUuid of duplicate) {
      this.logger.info(`Processing ${playersWithSameUuid.length} players with the same uuid`)
      const [, ...playersToDelete] = playersWithSameUuid.sort(
        (a: any, b: any) => (b.data?.length || 0) - (a.data?.length || 0)
      )

      for (const player of playersToDelete) {
        this.logger.info(`Deleting player ${player._id}\n ${player.uuid}`)
        bulkOperations.push({
          deleteOne: {
            filter: { _id: player._id },
          },
        })
      }
    }

    this.logger.info(`Total ${bulkOperations.length} players to delete`)

    if (bulkOperations.length > 0) {
      try {
        await db.players.bulkWrite(bulkOperations)
        this.logger.info('Bulk delete operations completed successfully')
      } catch (error) {
        this.logger.error('Error during bulk delete operations', error)
      }
    } else {
      this.logger.info('No players to delete')
    }
  }
}
