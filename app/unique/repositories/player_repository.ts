import { inject } from '@adonisjs/core'

import { db } from '#core/services/db'
import { MojangService } from '#minecraft/services/mojang'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
class PlayerRepository {
  constructor(
    private paladium: PaladiumService,
    private mojang: MojangService
  ) {}

  async findByUUID(uuid: string) {
    return db.users.findOne({ uuid })
  }

  async create(username: string) {
    const uuid = await this.mojang.getUUIDByUsername(username)

    const playerData = await this.paladium.getAllPlayerData(uuid)

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
          date: new Date().toISOString(),
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
