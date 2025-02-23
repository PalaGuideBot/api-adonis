import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'
import { Model } from 'mongoose'

import { db } from '#core/services/db'
import type { Category } from '#leaderboard/types'
import { PaladiumService } from '#paladium/services/paladium'

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
      {
        category: 'alliance',
        label: 'Alliance',
        model: db.leaderboardAlliance,
      },
      {
        category: 'job.alchemist',
        label: 'Job Alchemist',
        model: db.leaderboardJobAlchemist,
      },
      {
        category: 'job.farmer',
        label: 'Job Farmer',
        model: db.leaderboardJobFarmer,
      },
      {
        category: 'job.hunter',
        label: 'Job Hunter',
        model: db.leaderboardJobHunter,
      },
      {
        category: 'job.miner',
        label: 'Job Miner',
        model: db.leaderboardJobMiner,
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
