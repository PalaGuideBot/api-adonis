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
    const players = await db.users.find().lean()

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
        for (const player of playersWithSameUuid) {
          duplicate.push({ uuid: player.uuid, id: player._id })
        }
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate players`)

    const bulkOperations = []

    for (const { uuid } of duplicate) {
      const playerData = await db.users.find({ uuid }).lean()
      if (!playerData || playerData.length <= 1) continue

      const sortedPlayers = playerData.sort((a, b) => (a.data?.length || 0) - (b.data?.length || 0))

      bulkOperations.push({
        deleteOne: {
          filter: { _id: sortedPlayers[0]._id },
        },
      })
    }

    if (bulkOperations.length > 0) {
      try {
        await db.users.bulkWrite(bulkOperations)
        this.logger.info('Bulk delete operations completed successfully')
      } catch (error) {
        this.logger.error('Error during bulk delete operations', error)
      }
    } else {
      this.logger.info('No players to delete')
    }
  }
}
