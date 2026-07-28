import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'
import { getJobLevel } from '#utils/contents/jobs'

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
        'retry.count': { $lte: 10 },
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
                  newDate: new Date(),
                  views: player.data.at(-1)?.views ?? 0,
                  data: {
                    faction: playerData.profile.faction ?? '',
                    factionRank: playerData.profile.factionRank ?? '',
                    jobs: {
                      alchemist: {
                        level: getJobLevel(playerData.jobs.alchemist.xp),
                        xp: playerData.jobs.alchemist.xp,
                      },
                      farmer: {
                        level: getJobLevel(playerData.jobs.farmer.xp),
                        xp: playerData.jobs.farmer.xp,
                      },
                      hunter: {
                        level: getJobLevel(playerData.jobs.hunter.xp),
                        xp: playerData.jobs.hunter.xp,
                      },
                      miner: {
                        level: getJobLevel(playerData.jobs.miner.xp),
                        xp: playerData.jobs.miner.xp,
                      },
                    },
                    money: playerData.profile.money ?? 0,
                    rank: playerData.profile.rank ?? '',
                    timePlayed: playerData.profile.timePlayed ?? 0,
                    clicker: {
                      rps: playerData.clicker.rps,
                      production: playerData.clicker.production,
                    },
                  },
                },
              },
              $set: {
                username: playerData.profile.username, // Update username by mojang
                leaderboard: {
                  boss: playerData.ranks.boss ?? player.leaderboard?.boss ?? -1,
                  money: playerData.ranks.money ?? player.leaderboard?.money ?? -1,
                  end: playerData.ranks.end ?? player.leaderboard?.end ?? -1,
                  koth: playerData.ranks.koth ?? player.leaderboard?.koth ?? -1,
                  chorus: playerData.ranks.chorus ?? player.leaderboard?.chorus ?? -1,
                  egghunt: playerData.ranks.egghunt ?? player.leaderboard?.egghunt ?? -1,
                  // Invalid
                  corruption: -1,
                  clicker: playerData.ranks.clicker ?? player.leaderboard?.clicker ?? -1,
                  job_alchemist:
                    playerData.ranks['jobAlchemist'] ?? player.leaderboard?.job_alchemist ?? -1,
                  job_farmer: playerData.ranks['jobFarmer'] ?? player.leaderboard?.job_farmer ?? -1,
                  job_hunter: playerData.ranks['jobHunter'] ?? player.leaderboard?.job_hunter ?? -1,
                  job_miner: playerData.ranks['jobMiner'] ?? player.leaderboard?.job_miner ?? -1,
                  trixium: playerData.ranks.trixium ?? player.leaderboard?.trixium ?? -1,
                },
                achievements: playerData.achievements,
                firstSeen: playerData.profile.firstSeen ?? undefined,
                retry: {
                  count: 0,
                  disabled: false,
                },
                friends: playerData.friends,
                pet: playerData.pet ?? undefined,
                mount: playerData.mount
                  ? { ...playerData.mount, name: playerData.mount.name || '' }
                  : undefined,
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
