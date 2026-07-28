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

  private readonly BATCH_SIZE = 100
  private readonly STATE_KEY = 'sync_duplicate_player_offset'

  async run() {
    let state = await db.syncState.findOne({ key: this.STATE_KEY })
    const startOffset = state?.value?.offset || 0

    this.logger.info(`Starting from offset: ${startOffset}`)

    const totalPlayers = await db.players.countDocuments()
    this.logger.info(`Total players to scan: ${totalPlayers}`)

    const uuidMap = new Map()
    let currentOffset = startOffset
    let totalDeleted = 0

    while (currentOffset < totalPlayers) {
      this.logger.info(
        `Processing batch: ${currentOffset} - ${currentOffset + this.BATCH_SIZE} / ${totalPlayers}`
      )

      const players = await db.players
        .find()
        .skip(currentOffset)
        .limit(this.BATCH_SIZE)
        .select('uuid _id data')
        .lean()

      const bulkOperations = []

      for (const player of players) {
        if (uuidMap.has(player.uuid)) {
          const existingPlayer = uuidMap.get(player.uuid)
          const existingDataLength = existingPlayer.dataLength
          const currentDataLength = Array.isArray(player.data) ? player.data.length : 0

          if (currentDataLength > existingDataLength) {
            this.logger.info(
              `Duplicate found: ${player.uuid} - Deleting old player ${existingPlayer._id}`
            )
            bulkOperations.push({
              deleteOne: {
                filter: { _id: existingPlayer._id },
              },
            })
            uuidMap.set(player.uuid, {
              _id: player._id,
              dataLength: currentDataLength,
            })
          } else {
            this.logger.info(
              `Duplicate found: ${player.uuid} - Deleting current player ${player._id}`
            )
            bulkOperations.push({
              deleteOne: {
                filter: { _id: player._id },
              },
            })
          }
        } else {
          uuidMap.set(player.uuid, {
            _id: player._id,
            dataLength: Array.isArray(player.data) ? player.data.length : 0,
          })
        }
      }

      if (bulkOperations.length > 0) {
        this.logger.info(`Found ${bulkOperations.length} duplicates in this batch`)
        try {
          const result = await db.players.bulkWrite(bulkOperations)
          totalDeleted += result.deletedCount || 0
          this.logger.info(`Deleted ${result.deletedCount || 0} players in this batch`)
        } catch (error) {
          this.logger.error('Error during bulk delete operations', error as any)
        }
      }

      currentOffset += this.BATCH_SIZE

      await db.syncState.updateOne(
        { key: this.STATE_KEY },
        {
          $set: {
            key: this.STATE_KEY,
            value: { offset: currentOffset, totalDeleted },
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      )
    }

    this.logger.info('Sync completed!')
    this.logger.info(`Total players deleted: ${totalDeleted}`)

    await db.syncState.deleteOne({ key: this.STATE_KEY })
  }
}
