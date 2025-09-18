import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { DuplicateRepository } from '#other/repositories/duplicate_repository'
import { DuplicateSender } from '#other/services/duplicate_sender'

export default class PalaRefreshUUID extends BaseCommand {
  static commandName = 'pala:refresh_uuid'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(repo: DuplicateRepository, sender: DuplicateSender) {
    const pending = await repo.list(200)
    if (pending.length === 0) {
      this.logger.info('No pending duplicates to send')
      return
    }

    this.logger.info(`Sending ${pending.length} duplicates`)

    try {
      await sender.sendMany(pending.map((p) => ({ uuid: p.uuid })))
      this.logger.info('Duplicates sent successfully')
    } catch (error: unknown) {
      this.logger.error('Failed to send duplicates')
    }
  }
}
