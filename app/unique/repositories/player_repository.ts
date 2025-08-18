import { inject } from '@adonisjs/core'
import type { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'
import type { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import type { DistanceFilter } from '#core/validators/filter_validator'
// import { MojangService } from '#minecraft/services/mojang'
import upgrades from '#paladium/contents/clicker/upgrades'
import { getSeasons } from '#paladium/contents/seasons'
import { mergeBuildings } from '#paladium/helpers/clicker'
import { ImageService } from '#paladium/services/image'
import { PaladiumService } from '#paladium/services/paladium'
import type { playerJobsValidator } from '#paladium/validators/player'
import { aurelian } from '#unique/contents/aurelian'
import { player as defaultPlayer } from '#unique/contents/default'
import { getJobLevel } from '#utils/contents/jobs'

const DEFAULT_DAY_INTERVAL = 30

@inject()
class PlayerRepository {
  constructor(
    private paladiumService: PaladiumService,
    // private mojangService: MojangService,
    private imageService: ImageService
  ) {}

  async findByUUID(uuid: string, options: Partial<DistanceFilter> = {}) {
    const {
      from = DateTime.now().minus({ day: DEFAULT_DAY_INTERVAL }).startOf('day'),
      to = DateTime.now().endOf('day'),
    } = options

    if (uuid === 'e7c62d78-f0f6-4122-b194-53782dd0a06f') {
      return defaultPlayer
    }

    if (uuid === aurelian.player.uuid) {
      return aurelian.player
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

    player.data = player.data.map((d) => ({
      ...d,
      data: {
        ...d.data,
        jobs: Object.fromEntries(
          Object.entries(d.data.jobs).map(([job, value]) => [job, this.#transformPlayerJob(value)])
        ) as typeof d.data.jobs,
      },
    }))

    return player
  }

  async findByUsername(username: string, options: Partial<DistanceFilter> = {}) {
    const {
      from = DateTime.now().minus({ day: DEFAULT_DAY_INTERVAL }).startOf('day'),
      to = DateTime.now().endOf('day'),
    } = options

    if (username === 'PalaGuideBot') {
      return defaultPlayer
    }

    if (username === aurelian.player.username) {
      return aurelian.player
    }

    const player = await db.players
      .findOne(
        { username: { $regex: new RegExp(`^${username.toLowerCase()}$`, 'i') } },
        { data: 0 }
      )
      .lean()

    if (!player) {
      return null
    }

    const data = await db.players.aggregate([
      { $match: { uuid: player.uuid } },
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

    player.data = player.data.map((d) => ({
      ...d,
      data: {
        ...d.data,
        jobs: Object.fromEntries(
          Object.entries(d.data.jobs).map(([job, value]) => [job, this.#transformPlayerJob(value)])
        ) as typeof d.data.jobs,
      },
    }))

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
    const playerData = await this.paladiumService.getAllPlayerData(username)

    const exists = await db.players.exists({ uuid: playerData.profile.uuid })

    if (exists) {
      await db.players.updateOne(
        { uuid: playerData.profile.uuid },
        { $set: { username: playerData.profile.username } }
      )
      return this.findByUsername(username) as Promise<
        NonNullable<Awaited<ReturnType<typeof this.findByUsername>>>
      >
    }

    const player = new db.players({
      uuid: playerData.profile.uuid,
      username: playerData.profile.username,
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
      firstSeen: playerData.profile.firstSeen,
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

    await player.save()

    return this.findByUsername(player.username) as Promise<
      NonNullable<Awaited<ReturnType<typeof this.findByUsername>>>
    >
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

  async findByUUIDWrapped(uuid: string) {
    const season = getSeasons()['v10.5']

    const query = await db.players.aggregate([
      {
        $match: {
          'uuid': uuid,
          'data.newDate': {
            $lte: season.end.toJSDate(),
          },
        },
      },
      // First unwind data to sort it
      { $unwind: '$data' },
      // Add date filter here
      {
        $match: {
          'data.newDate': {
            $gte: season.start.toJSDate(),
            $lte: season.end.toJSDate(),
          },
        },
      },
      // Sort by newDate
      { $sort: { 'data.newDate': -1 } },
      // Group back to get the first (most recent) document
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          uuid: { $first: '$uuid' },
          achievements: { $first: '$achievements' },
          mount: { $first: '$mount' },
          pet: { $first: '$pet' },
          friends: { $first: '$friends' },
          data: { $push: '$data' },
          leaderboard: { $first: '$leaderboard' },
        },
      },
      {
        $project: {
          '_id': 0,
          'username': 1,
          'uuid': 1,
          'achievements.completed': 1,
          'achievements.total': 1,
          'mount.mountType': 1,
          'mount.name': 1,
          'mount.level': 1,
          'pet.currentSkin': 1,
          'pet.level': 1,
          'friends': { $size: '$friends' },
          'faction': { $arrayElemAt: ['$data.data.faction', 0] },
          'factionsCount': {
            $size: {
              $setUnion: {
                $map: {
                  input: {
                    $filter: {
                      input: '$data',
                      as: 'one',
                      cond: { $ne: ['$$one.data.faction', ''] },
                    },
                  },
                  in: '$$this.data.faction',
                },
              },
            },
          },
          'timePlayed': { $arrayElemAt: ['$data.data.timePlayed', 0] },
          'jobs': {
            $arrayToObject: {
              $map: {
                input: {
                  $objectToArray: { $arrayElemAt: ['$data.data.jobs', 0] },
                },
                as: 'job',
                in: { k: '$$job.k', v: '$$job.v.xp' },
              },
            },
          },
          'moneyMax': { $max: { $map: { input: '$data', in: { $max: '$$this.data.money' } } } },
          'bestLeaderboard': {
            $reduce: {
              input: {
                $filter: {
                  input: { $objectToArray: '$leaderboard' },
                  as: 'entry',
                  cond: { $gt: ['$$entry.v', 0] },
                },
              },
              initialValue: { name: null, value: Infinity },
              in: {
                $cond: {
                  if: { $lt: ['$$this.v', '$$value.value'] },
                  then: { name: '$$this.k', value: '$$this.v' },
                  else: '$$value',
                },
              },
            },
          },
        },
      },
    ])

    const player = query[0] as
      | {
          username: string
          uuid: string
          achievements: { completed: number; total: number }
          mount: { mountType: string; name: string; level: number }
          pet: { currentSkin: string; level: number }
          friends: number
          faction: string
          factionsCount: number
          timePlayed: number
          jobs: Record<string, number>
          moneyMax: number
          bestLeaderboard: { name: string; value: number }
        }
      | undefined

    if (!player) {
      return null
    }

    const clicker = await this.getClickerData(player.uuid)
    const lastBuildingUnlockedIndex = clicker.buildings.findIndex(
      (building) => building.quantity === 0
    )

    let faction = null

    try {
      faction =
        player.faction !== '' ? await this.paladiumService.getFactionProfile(player.faction) : null
    } catch {}

    const factionEmblem = faction ? await this.imageService.getOrCreateEmblem(faction.emblem) : null

    return {
      ...player,
      bestLeaderboard: player.bestLeaderboard.name === null ? null : player.bestLeaderboard,
      faction: {
        name: player.faction,
        alliance: faction ? faction.alliance : null,
        emblemUrl: factionEmblem?.url,
      },
      clicker: {
        production: clicker.buildings
          .filter((building) => building.quantity > 0)
          .reduce((acc, building) => acc + building.production, 0),
        rps: clicker.rps,
        buildings: {
          lastUnlocked:
            clicker.buildings[
              lastBuildingUnlockedIndex !== -1
                ? lastBuildingUnlockedIndex - 1
                : clicker.buildings.length - 1
            ],
          unlocked: clicker.buildings.filter((building) => building.quantity > 0).length,
          total: clicker.buildings.length,
        },
        upgrades: {
          unlocked: clicker.upgrades.length,
          total: Object.values(upgrades).flat().length,
        },
      },
      jobs: Object.fromEntries(
        Object.entries(player.jobs).map(([job, xp]) => [job, getJobLevel(xp)])
      ),
    }
  }

  #transformPlayerJob(job: Infer<typeof playerJobsValidator>['alchemist']) {
    return { ...job, level: getJobLevel(job.xp) }
  }
}

export { PlayerRepository }
