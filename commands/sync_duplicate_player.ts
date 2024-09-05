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

    const duplicate = []

    for (const player of players) {
      if (players.filter((p) => p.uuid === player.uuid).length > 1) {
        duplicate.push({ uuid: player.uuid, id: player._id })
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate players`)

    for (const player of duplicate) {
      this.logger.info(player.uuid)
    }
  }
}
