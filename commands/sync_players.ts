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

    const players = await db.players
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
      .limit(280)

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
                    factionRank: playerData.profile.factionRank ?? null,
                    jobs: {
                      alchemist: playerData.jobs.alchemist || {
                        level: 0,
                        xp: 0,
                      },
                      farmer: playerData.jobs.farmer || {
                        level: 0,
                        xp: 0,
                      },
                      hunter: playerData.jobs.hunter || {
                        level: 0,
                        xp: 0,
                      },
                      miner: playerData.jobs.miner || {
                        level: 0,
                        xp: 0,
                      },
                    },
                    money: playerData.profile.money,
                    rank: playerData.profile.rank,
                    timePlayed: playerData.profile.timePlayed,
                    clicker: {
                      rps: playerData.clicker.rps,
                      production: playerData.clicker.production,
                    },
                  },
                },
              },
              $set: {
                leaderboard: {
                  boss: playerData.ranks.boss ?? player.leaderboard?.boss ?? -1,
                  money: playerData.ranks.money ?? player.leaderboard?.money ?? -1,
                  end: playerData.ranks.end ?? player.leaderboard?.end ?? -1,
                  koth: playerData.ranks.koth ?? player.leaderboard?.koth ?? -1,
                  chorus: playerData.ranks.chorus ?? player.leaderboard?.chorus ?? -1,
                  egghunt: playerData.ranks.egghunt ?? player.leaderboard?.egghunt ?? -1,
                  // corruption: playerData.ranks.corruption ?? player.leaderboard?.corruption ?? -1,
                  clicker: playerData.ranks.clicker ?? player.leaderboard?.clicker ?? -1,
                  job_alchemist:
                    playerData.ranks['jobAlchemist'] ?? player.leaderboard?.job_alchemist ?? -1,
                  job_farmer: playerData.ranks['jobFarmer'] ?? player.leaderboard?.job_farmer ?? -1,
                  job_hunter: playerData.ranks['jobHunter'] ?? player.leaderboard?.job_hunter ?? -1,
                  job_miner: playerData.ranks['jobMiner'] ?? player.leaderboard?.job_miner ?? -1,
                  trixium: playerData.ranks.trixium ?? player.leaderboard?.trixium ?? -1,
                },
                achievements: playerData.achievements,
                firstJoin: playerData.profile.firstJoin,
                retry: {
                  count: 0,
                  disabled: false,
                },
                friends: playerData.friends,
                pet: playerData.pet,
                mount: playerData.mount,
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
                  disabled: player.retry?.count ? player.retry.count >= 10 : false,
                },
              },
            },
          },
        })
      }
    }

    if (bulkOperations.length > 0) {
      await db.players.bulkWrite(bulkOperations)
      if (updated > 0) this.logger.info(`${updated} players synced !`, { prefix: this.prefix })
    }
  }
}
