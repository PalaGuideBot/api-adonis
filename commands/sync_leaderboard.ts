import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

export default class SyncLeaderboard extends BaseCommand {
  static commandName = 'sync:leaderboard'
  static description = ''

  protected prefix = 'SyncLeaderboard'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(paladiumService: PaladiumService) {
    const categoriesLeaderboard: { name: string; model: any; request: Promise<any> }[] = [
      {
        name: 'Boss',
        model: db.leaderboardBoss,
        request: paladiumService.getLeaderboardRanking('boss'),
      },
      {
        name: 'Chorus',
        model: db.leaderboardChorus,
        request: paladiumService.getLeaderboardRanking('chorus'),
      },
      {
        name: 'Egg Hunt',
        model: db.leaderboardEggHunt,
        request: paladiumService.getLeaderboardRanking('egghunt'),
      },
      {
        name: 'End',
        model: db.leaderboardEnd,
        request: paladiumService.getLeaderboardRanking('end'),
      },
      {
        name: 'Factions',
        model: db.leaderboardFactions,
        request: paladiumService.getLeaderboardFactions(),
      },
      {
        name: 'Koth',
        model: db.leaderboardKoth,
        request: paladiumService.getLeaderboardRanking('koth'),
      },
      {
        name: 'Money',
        model: db.leaderboardMoney,
        request: paladiumService.getLeaderboardRanking('money'),
      },
      {
        name: 'Trixium Faction',
        model: db.leaderboardTrixiumFaction,
        request: paladiumService.getLeaderboardRankingTrixium('faction'),
      },
      {
        name: 'Trixium User',
        model: db.leaderboardTrixiumUser,
        request: paladiumService.getLeaderboardRankingTrixium('player'),
      },
    ]
    const now = DateTime.now().toFormat('yyyy-MM-dd')

    this.logger.info('Syncing leaderboard...', { prefix: this.prefix })

    for (const category of categoriesLeaderboard) {
      try {
        const existingLeaderboard = await category.model.find({ date: now }).lean().exec()

        if (existingLeaderboard.length === 0) {
          this.logger.info(`No data for ${category.name} on ${now}. Fetching new data...`, {
            prefix: this.prefix,
          })
          const responses = await category.request

          const newLeaderboard = new category.model({
            date: now,
            data: responses,
          })

          await newLeaderboard.save()
          this.logger.info(`Saved new data for ${category.name} leaderboard.`, {
            prefix: this.prefix,
          })
        } else {
          this.logger.info(`Data for ${category.name} already exists for ${now}. Skipping...`, {
            prefix: this.prefix,
          })
        }
      } catch (error) {
        this.logger.error(`Error processing ${category.name}: ${error.message}`, {
          prefix: this.prefix,
        })
      }
    }

    this.logger.info('Leaderboard synchronization complete.', { prefix: this.prefix })
  }
}
