import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'
import { Model } from 'mongoose'
import { LeaderboardCategory, LeaderboardTrixiumCategory } from '#leaderboard/types'

type Category =
  | Exclude<LeaderboardCategory, 'job.alchemist' | 'job.hunter' | 'job.miner' | 'job.farmer'>
  | `trixium.${LeaderboardTrixiumCategory}`

type CategoryItem = {
  category: Category
  label: string
  model: Model<any>
}

export default class SyncLeaderboard extends BaseCommand {
  static commandName = 'sync:leaderboard'
  static description = ''

  protected prefix = 'SyncLeaderboard'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(paladiumService: PaladiumService) {
    const categories: CategoryItem[] = [
      {
        category: 'money',
        label: 'Money',
        model: db.leaderboardMoney,
      },
      {
        category: 'boss',
        label: 'Boss',
        model: db.leaderboardBoss,
      },
      {
        category: 'egghunt',
        label: 'Egg Hunt',
        model: db.leaderboardEggHunt,
      },
      {
        category: 'end',
        label: 'End',
        model: db.leaderboardEnd,
      },
      {
        category: 'chorus',
        label: 'Chorus',
        model: db.leaderboardChorus,
      },
      {
        category: 'koth',
        label: 'KOTH',
        model: db.leaderboardKoth,
      },
      {
        category: 'trixium.player',
        label: 'Trixium Player',
        model: db.leaderboardTrixiumPlayer,
      },
      {
        category: 'trixium.faction',
        label: 'Trixium Faction',
        model: db.leaderboardTrixiumFaction,
      },
      {
        category: 'factions',
        label: 'Factions',
        model: db.leaderboardFactions,
      },
      {
        category: 'clicker',
        label: 'Clicker',
        model: db.leaderboardClicker,
      },
    ]

    const now = DateTime.now().toFormat('yyyy-MM-dd')

    for (const category of categories) {
      try {
        const existingLeaderboard = await category.model.find({ date: now }).lean().exec()

        if (existingLeaderboard.length === 0) {
          this.logger.info(`No data for ${category.label} on ${now}. Fetching new data...`, {
            prefix: this.prefix,
          })

          let responses
          switch (category.category) {
            case 'factions':
              responses = await paladiumService.getLeaderboardFactions()
              break
            default:
              responses = await paladiumService.getLeaderboardRanking(category.category)
              break
          }

          const newLeaderboard = new category.model({
            date: now,
            newDate: new Date(),
            data: responses,
          })

          await newLeaderboard.save()
          this.logger.info(`Saved new data for ${category.label} leaderboard.`, {
            prefix: this.prefix,
          })
        }
      } catch (error) {
        this.logger.error(`Error processing ${category.label}: ${error.message}`, {
          prefix: this.prefix,
        })
      }
    }
  }
}
