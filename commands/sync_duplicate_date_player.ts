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

  private readonly BATCH_SIZE = 100
  private readonly STATE_KEY = 'sync_duplicate_player_date_offset'

  async run() {
    // Récupérer l'état de la dernière exécution
    let state = await db.syncState.findOne({ key: this.STATE_KEY })
    const startOffset = state?.value?.offset || 0

    this.logger.info(`Starting from offset: ${startOffset}`)

    // Compter le total de joueurs
    const totalPlayers = await db.players.countDocuments()
    this.logger.info(`Total players to scan: ${totalPlayers}`)

    let currentOffset = startOffset
    let totalDuplicatesFound = 0
    let totalProcessed = 0

    while (currentOffset < totalPlayers) {
      this.logger.info(
        `Processing batch: ${currentOffset} - ${currentOffset + this.BATCH_SIZE} / ${totalPlayers}`
      )

      // Récupérer un lot de joueurs
      const players = await db.players.find().skip(currentOffset).limit(this.BATCH_SIZE).lean()

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

      if (duplicate.length > 0) {
        this.logger.info(`Found ${duplicate.length} duplicate players in this batch`)
        totalDuplicatesFound += duplicate.length

        const bulkOperations = []

        for (const player of duplicate) {
          const playerData = await db.players.findOne({ uuid: player.uuid }).lean()
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
            await db.players.bulkWrite(bulkOperations)
            totalProcessed += bulkOperations.length
            this.logger.info(`Processed ${bulkOperations.length} players in this batch`)
          } catch (error) {
            this.logger.error('Error during bulk update operations', error as any)
            // Ne pas arrêter le processus, continuer avec le prochain lot
          }
        }
      }

      currentOffset += this.BATCH_SIZE

      // Sauvegarder la progression
      await db.syncState.updateOne(
        { key: this.STATE_KEY },
        {
          $set: {
            key: this.STATE_KEY,
            value: { offset: currentOffset, totalDuplicatesFound, totalProcessed },
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      )
    }

    this.logger.info('Sync completed!')
    this.logger.info(`Total duplicates found: ${totalDuplicatesFound}`)
    this.logger.info(`Total players processed: ${totalProcessed}`)

    // Réinitialiser l'état après la fin
    await db.syncState.deleteOne({ key: this.STATE_KEY })
  }
}
