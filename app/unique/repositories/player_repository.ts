import { inject } from '@adonisjs/core'

import { db } from '#core/services/db'
import { MojangService } from '#minecraft/services/mojang'
import { PaladiumService } from '#paladium/services/paladium'
import { player as defaultPlayer } from '#unique/contents/default'
import { DateTime } from 'luxon'

@inject()
class PlayerRepository {
  constructor(
    private paladiumService: PaladiumService,
    private mojangService: MojangService
  ) {}

  async findByUUID(uuid: string) {
    if (uuid === 'e7c62d78-f0f6-4122-b194-53782dd0a06f') {
      return defaultPlayer
    }

    return db.users.findOne({ uuid }).lean()
  }

  async create(username: string) {
    const uuid = await this.mojangService.getUUIDByUsername(username)

    const playerData = await this.paladiumService.getAllPlayerData(uuid)

    const player = new db.users({
      uuid,
      username,
      leaderboard: {
        boss: playerData.ranks.boss || -1,
        money: playerData.ranks.money || -1,
        end: playerData.ranks.end || -1,
        koth: playerData.ranks.koth || -1,
        chorus: playerData.ranks.chorus || -1,
        egghunt: playerData.ranks.egghunt || -1,
        // corruption: playerData.ranks.corruption || -1,
        clicker: playerData.ranks.clicker || -1,
        trixium: playerData.ranks.trixium || -1,
        job_alchemist: playerData.ranks['jobAlchemist'] || -1,
        job_farmer: playerData.ranks['jobFarmer'] || -1,
        job_hunter: playerData.ranks['jobHunter'] || -1,
        job_miner: playerData.ranks['jobMiner'] || -1,
      },
      achievements: playerData.achievements,
      firstJoin: playerData.profile.firstJoin,
      data: [
        {
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          data: {
            faction: playerData.profile.faction,
            jobs: {
              alchemist: playerData.profile.jobs.alchemist || { level: 0, xp: 0 },
              farmer: playerData.profile.jobs.farmer || { level: 0, xp: 0 },
              hunter: playerData.profile.jobs.hunter || { level: 0, xp: 0 },
              miner: playerData.profile.jobs.miner || { level: 0, xp: 0 },
            },
            money: playerData.profile.money,
            rank: playerData.profile.rank,
            timePlayed: playerData.profile.timePlayed,
          },
        },
      ],
      retry: {
        count: 0,
        disabled: false,
      },
    })

    return player.save()
  }

  async countByDate() {
    return await db.users.aggregate<{ _id: string; count: number }>([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  }
}

export { PlayerRepository }
