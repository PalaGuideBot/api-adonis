import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { BotRepository } from '#bot/repositories/bot_repository'
import { guildsValidator } from '#bot/validators/guilds_validator'

@inject()
export default class GuildsController {
  constructor(private botRepository: BotRepository) {}

  async update({ request, response }: HttpContext) {
    const body = await request.validateUsing(guildsValidator)

    const bot = await this.botRepository.findByDate(DateTime.now().toFormat('yyyy-MM-dd'))

    if (!bot) {
      await this.botRepository.create({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        guilds: body,
        interactions: [],
      })
    } else {
      this.botRepository.update(bot, { guilds: body })
    }

    return response.ok({ message: 'Guilds added' })
  }
}
