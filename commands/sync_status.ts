import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

export default class SyncStatus extends BaseCommand {
  static commandName = 'sync:status'
  static description = ''

  protected prefix = 'SyncStatus'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(paladiumService: PaladiumService) {
    const now = DateTime.now().set({ second: 0, millisecond: 0 }).toFormat('yyyy-MM-dd HH:mm:ss')

    const responses = await paladiumService.getStatus()

    const newStatus = new db.paladiumStatus({
      date: now,
      data: responses,
    })

    await newStatus.save()

    this.logger.info('Synced status', { prefix: this.prefix })
  }
}
