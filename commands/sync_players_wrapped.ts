import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'
import { PlayerRepository } from '#unique/repositories/player_repository'

export default class SyncPlayersWrapped extends BaseCommand {
  static commandName = 'sync:players:wrapped'
  static description = ''

  protected prefix = 'SyncPlayersWrapped'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(playerRepository: PlayerRepository) {
    const existingWrapped = await db.playersWrapped.find().select(['uuid']).lean()
    const existingUUIDs = existingWrapped.map((p) => p.uuid)

    const players = await db.players
      .find({ uuid: { $nin: existingUUIDs } })
      .select(['uuid'])
      .limit(280)

    const bulkOperations = []
    let updated = 0

    for (const player of players) {
      const uuid = player.uuid

      let wrapped = null
      try {
        wrapped = await playerRepository.findByUUIDWrapped(uuid)
      } catch {}

      if (wrapped) {
        updated++
        bulkOperations.push({
          updateOne: {
            filter: { uuid },
            update: {
              $set: {
                username: wrapped.username,
                achievements: wrapped.achievements,
                mount: wrapped.mount,
                pet: wrapped.pet,
                friends: wrapped.friends,
                faction: wrapped.faction,
                factionsCount: wrapped.factionsCount,
                timePlayed: wrapped.timePlayed,
                jobs: wrapped.jobs,
                moneyMax: wrapped.moneyMax,
                bestLeaderboard: wrapped.bestLeaderboard,
                clicker: wrapped.clicker,
              },
            },
            upsert: true,
          },
        })
      } else {
        this.logger.warning(`Player ${uuid} wrapped not found`, { prefix: this.prefix })
      }
    }

    if (bulkOperations.length > 0) {
      await db.playersWrapped.bulkWrite(bulkOperations)
      if (updated > 0)
        this.logger.info(`${updated} players wrapped synced !`, { prefix: this.prefix })
    }
  }
}
