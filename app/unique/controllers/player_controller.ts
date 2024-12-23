import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import cache from '#cache/cache'
import { distanceValidator } from '#core/validators/filter_validator'
import { LinkRepository } from '#link/repositories/link_repository'
import { MojangService } from '#minecraft/services/mojang'
import { PlayerRepository } from '#unique/repositories/player_repository'
import { UserRepository } from '#user/repositories/user_repository'
import { getJobNeededXpForLevel } from '#utils/contents/jobs'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
export default class PlayerController {
  constructor(
    private playerRepository: PlayerRepository,
    private mojangService: MojangService,
    private linkRepository: LinkRepository,
    private userRepository: UserRepository,
    private paladiumService: PaladiumService
  ) {}

  async index({ response, request }: HttpContext) {
    let players: Awaited<ReturnType<typeof this.playerRepository.findByDate>> = []

    if (request.qs().latest) {
      const now = DateTime.now()
      players = await this.playerRepository.findByDate(now)
    }

    return response.ok(players)
  }

  async show({ response, request, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    const options = await distanceValidator.validate(request.qs())

    let player = await this.playerRepository.findByUUID(uuid, options)
    if (!player) {
      try {
        player = await this.playerRepository.create(params.username)
      } catch {
        return response.notFound({ message: 'Player not found' })
      }
    }

    let flags: NonNullable<Awaited<ReturnType<typeof this.userRepository.findById>>>['roles'] = []

    const link = await this.linkRepository.findByUUID(player.uuid)

    if (link) {
      const user = await this.userRepository.findById(link.discordId)
      flags = user?.roles || []
    }

    const market = await cache.getOrSet({
      key: `player:market:${player.uuid}`,
      factory: async () => {
        const data = await this.paladiumService.getPlayerMarket(player.uuid)
        const date = DateTime.now().toISO()

        return {
          ...data,
          lastUpdate: date,
        }
      },
      ttl: '5m',
    })

    return response.ok({ ...player, flags, market })
  }

  async flags({ response, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    const link = await this.linkRepository.findByUUID(uuid)

    if (!link) {
      return response.notFound({ message: 'Player not linked' })
    }

    const user = await this.userRepository.findById(link.discordId)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.ok({ flags: user.roles })
  }

  async create({ response, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    const exists = await this.playerRepository.findByUUID(uuid)

    if (exists) {
      return response.badRequest({ message: 'Player already exists' })
    }

    const player = await this.playerRepository.create(params.username)

    return response.ok({ message: `Player "${player.username}" created` })
  }

  async clicker({ response, params }: HttpContext) {
    const cacheKey = `player:clicker:${params.username}`

    if (await cache.has(cacheKey)) {
      return response.ok(await cache.get(cacheKey))
    }

    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    let player = await this.playerRepository.findByUUID(uuid)

    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    const jobs =
      player.data
        .toSorted((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds())
        .at(-1)?.data.jobs || null

    let clicker = await this.playerRepository.getClickerData(uuid)

    const result = {
      username: player.username,
      jobs: jobs,
      ...clicker,
    }

    await cache.set({
      key: cacheKey,
      value: result,
      ttl: '15m',
    })

    return response.ok(result)
  }

  async jobs({ response, params }: HttpContext) {
    let uuid: string
    try {
      uuid = await this.mojangService.getUUIDByUsername(params.username)
    } catch (error) {
      return response.badRequest({
        message: "Player don't exists or is invalid",
      })
    }

    let player = await this.playerRepository.findByUUID(uuid)

    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    const jobs = player.data
      .toSorted((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds())
      .at(-1)?.data.jobs

    if (!jobs) {
      return response.ok(null)
    }

    return response.ok(
      Object.fromEntries(
        Object.entries(jobs).map(([key, value]) => [
          key,
          {
            ...value,
            xp: Math.floor(Math.max(0, value.xp - getJobNeededXpForLevel(value.level))),
          },
        ])
      )
    )
  }
}
