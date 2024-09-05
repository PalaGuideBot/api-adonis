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
      if (player.data && player.data.length > 1) {
        const dates = player.data.map((d) => d.date)
        if (dates.length !== new Set(dates).size) {
          duplicate.push({ uuid: player.uuid, id: player._id })
        }
      }
    }

    this.logger.info(`Found ${duplicate.length} duplicate players`)

    for (const player of duplicate) {
      this.logger.info(player.uuid)
    }
  }
}
