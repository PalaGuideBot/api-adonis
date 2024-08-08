import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

export default class SyncPlayers extends BaseCommand {
  static commandName = 'sync:players'
  static description = ''

  protected prefix = 'SyncPlayers'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(paladiumService: PaladiumService) {
    const now = DateTime.now().toSQLDate()

    const players = await db.users
      .find({
        'data': {
          $not: {
            $elemMatch: {
              date: now,
            },
          },
        },
        'retry.count': { $lt: 10 },
        'retry.disabled': false,
      })
      .limit(50)

    const bulkOperations = []
    let updated = 0

    for (const player of players) {
      const uuid = player.uuid
      const id = player._id

      let playerData = null
      try {
        playerData = await paladiumService.getAllPlayerData(uuid)
      } catch {}

      if (playerData) {
        updated++
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $push: {
                data: {
                  date: now,
                  data: {
                    faction: playerData.profile.faction,
                    jobs: {
                      alchemist: playerData.profile.jobs.alchemist || {
                        level: 0,
                        xp: 0,
                      },
                      farmer: playerData.profile.jobs.farmer || {
                        level: 0,
                        xp: 0,
                      },
                      hunter: playerData.profile.jobs.hunter || {
                        level: 0,
                        xp: 0,
                      },
                      miner: playerData.profile.jobs.miner || {
                        level: 0,
                        xp: 0,
                      },
                    },
                    money: playerData.profile.money,
                    rank: playerData.profile.rank,
                    timePlayed: playerData.profile.timePlayed,
                  },
                },
              },
              $set: {
                leaderboard: {
                  boss: playerData.ranks.boss || -1,
                  money: playerData.ranks.money || -1,
                  end: playerData.ranks.end || -1,
                  koth: playerData.ranks.koth || -1,
                  chorus: playerData.ranks.chorus || -1,
                  egghunt: playerData.ranks.egghunt || -1,
                  // corruption: playerData.ranks.corruption || -1,
                  clicker: playerData.ranks.clicker || -1,
                  job_alchemist: playerData.ranks['jobAlchemist'] || -1,
                  job_farmer: playerData.ranks['jobFarmer'] || -1,
                  job_hunter: playerData.ranks['jobHunter'] || -1,
                  job_miner: playerData.ranks['jobMiner'] || -1,
                  trixium: playerData.ranks.trixium || -1,
                },
                achievements: playerData.achievements,
                firstJoin: playerData.profile.firstJoin,
                retry: {
                  count: 0,
                  disabled: false,
                },
                friends: playerData.friends,
              },
            },
          },
        })
      } else {
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $set: {
                retry: {
                  count: player.retry?.count ? player.retry.count + 1 : 1,
                  disabled: player.retry?.count ? player.retry.count >= 5 : false,
                },
              },
            },
          },
        })
      }
    }

    if (bulkOperations.length > 0) {
      await db.users.bulkWrite(bulkOperations)
      this.logger.info(`${updated} players synced !`, { prefix: this.prefix })
    }
  }
}
