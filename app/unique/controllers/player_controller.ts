import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { MojangService } from '#minecraft/services/mojang'
import { PlayerRepository } from '#unique/repositories/player_repository'

@inject()
export default class PlayerController {
  constructor(
    private playerRepository: PlayerRepository,
    private mojangService: MojangService
  ) {}

  async show({ response, params }: HttpContext) {
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
      try {
        player = await this.playerRepository.create(params.username)
      } catch {
        return response.notFound({ message: 'Player not found' })
      }
    }

    player.data = player.data.toSorted(
      (a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds()
    )

    return response.ok(player)
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

    let clicker = await this.playerRepository.getClickerData(uuid)

    const result = {
      username: player.username,
      jobs: player.data[0]?.data.jobs ?? null,
      ...clicker,
    }

    await cache.set({
      key: cacheKey,
      value: result,
      ttl: '15m',
    })

    return response.ok(result)
  }
}
