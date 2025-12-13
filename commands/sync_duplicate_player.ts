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

    this.logger.info('Phase 1: Building UUID map...')
    const uuidMap = new Map()
    let currentOffset = 0

    while (currentOffset < totalPlayers) {
      this.logger.info(
        `Scanning batch: ${currentOffset} - ${currentOffset + this.BATCH_SIZE} / ${totalPlayers}`
      )

      const players = await db.players
        .find()
        .skip(currentOffset)
        .limit(this.BATCH_SIZE)
        .select('uuid _id data')
        .lean()

      for (const player of players) {
        if (!uuidMap.has(player.uuid)) {
          uuidMap.set(player.uuid, [])
        }
        uuidMap.get(player.uuid).push(player)
      }

      currentOffset += this.BATCH_SIZE
    }

    const duplicate = []
    for (const [, playersWithSameUuid] of uuidMap.entries()) {
      if (playersWithSameUuid.length > 1) {
        duplicate.push(playersWithSameUuid)
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate UUID groups`)

    this.logger.info('Phase 2: Deleting duplicates...')
    let totalDeleted = 0

    for (let i = 0; i < duplicate.length; i += this.BATCH_SIZE) {
      const batch = duplicate.slice(i, i + this.BATCH_SIZE)
      this.logger.info(
        `Processing duplicate batch: ${i} - ${Math.min(i + this.BATCH_SIZE, duplicate.length)} / ${duplicate.length}`
      )

      const bulkOperations = []

      for (const playersWithSameUuid of batch) {
        this.logger.info(`Processing ${playersWithSameUuid.length} players with the same uuid`)
        const [, ...playersToDelete] = playersWithSameUuid.sort(
          (a: any, b: any) => (b.data?.length || 0) - (a.data?.length || 0)
        )

        for (const player of playersToDelete) {
          this.logger.info(`Deleting player ${player._id} - ${player.uuid}`)
          bulkOperations.push({
            deleteOne: {
              filter: { _id: player._id },
            },
          })
        }
      }

      if (bulkOperations.length > 0) {
        try {
          const result = await db.players.bulkWrite(bulkOperations)
          totalDeleted += result.deletedCount || 0
          this.logger.info(`Deleted ${result.deletedCount || 0} players in this batch`)
        } catch (error) {
          this.logger.error('Error during bulk delete operations', error)
        }
      }

      await db.syncState.updateOne(
        { key: this.STATE_KEY },
        {
          $set: {
            key: this.STATE_KEY,
            value: { offset: i + this.BATCH_SIZE, totalDeleted },
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      )
    }

    this.logger.info('Sync completed!')
    this.logger.info(`Total duplicates found: ${duplicate.length}`)
    this.logger.info(`Total players deleted: ${totalDeleted}`)

    await db.syncState.deleteOne({ key: this.STATE_KEY })
  }
}
