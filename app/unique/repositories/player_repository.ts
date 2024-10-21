import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import type { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import type { DistanceFilter } from '#core/validators/filter_validator'
import { MojangService } from '#minecraft/services/mojang'
import { mergeBuildings } from '#paladium/helpers/clicker'
import { PaladiumService } from '#paladium/services/paladium'
import { player as defaultPlayer } from '#unique/contents/default'

const DEFAULT_DAY_INTERVAL = 30

@inject()
class PlayerRepository {
  constructor(
    private paladiumService: PaladiumService,
    private mojangService: MojangService
  ) {}

  async findByUUID(uuid: string, options: Partial<DistanceFilter> = {}) {
    const {
      from = DateTime.now().minus({ day: DEFAULT_DAY_INTERVAL }).startOf('day'),
      to = DateTime.now().endOf('day'),
    } = options

    if (uuid === 'e7c62d78-f0f6-4122-b194-53782dd0a06f') {
      return defaultPlayer
    }

    const player = await db.players.findOne({ uuid }, { data: 0 }).lean()

    if (!player) {
      return null
    }

    const data = await db.players.aggregate([
      { $match: { uuid } },
      { $unwind: '$data' },
      {
        $match: {
          'data.newDate': {
            $gte: from.startOf('day').toJSDate(),
            $lte: to.endOf('day').toJSDate(),
          },
        },
      },
      { $sort: { 'data.newDate': 1 } },
      {
        $group: {
          _id: '$_id',
          data: { $push: '$data' },
        },
      },
    ])

    player.data = data[0]?.data || []

    return player
  }

  async findByDate(date: DateTime, size: number = 1) {
    const players = await db.players
      .find({
        data: {
          $size: size <= 0 ? undefined : size,
          $elemMatch: {
            newDate: {
              $gte: date.startOf('day').toJSDate(),
              $lte: date.endOf('day').toJSDate(),
            },
          },
        },
      })
      .select<Pick<InferSchemaType<typeof db.players.schema>, 'uuid' | 'username' | 'data'>>([
        'uuid',
        'username',
        'data.newDate',
      ])
      .lean()

    return players.map(({ _id, data, ...player }) => ({ ...player, date: data[0].newDate }))
  }

  async create(username: string) {
    const uuid = await this.mojangService.getUUIDByUsername(username)

    const playerData = await this.paladiumService.getAllPlayerData(uuid)

    const player = new db.players({
      uuid,
      username,
      leaderboard: {
        boss: playerData.ranks?.boss || -1,
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
          newDate: new Date(),
          data: {
            faction: playerData.profile.faction,
            factionRank: playerData.profile.factionRank ?? null,
            jobs: {
              alchemist: playerData.jobs.alchemist,
              farmer: playerData.jobs.farmer,
              hunter: playerData.jobs.hunter,
              miner: playerData.jobs.miner,
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
      ],
      retry: {
        count: 0,
        disabled: false,
      },
      friends: playerData.friends,
      pet: playerData.pet,
      mount: playerData.mount,
    })

    return player.save()
  }

  async countByDate() {
    return await db.players.aggregate<{ _id: string; count: number }>([
      { $unwind: '$data' },
      { $group: { _id: '$data.date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
  }

  async getClickerData(uuid: string) {
    const clicker = await this.paladiumService.getPlayerClicker(uuid)

    return { ...clicker, buildings: mergeBuildings(clicker.buildings) }
  }
}

export { PlayerRepository }
