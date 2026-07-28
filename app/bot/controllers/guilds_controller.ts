import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { DateTime } from 'luxon'

import { BotRepository } from '#bot/repositories/bot_repository'
import { guildsValidator } from '#bot/validators/guilds_validator'

@inject()
export default class GuildsController {
  constructor(private botRepository: BotRepository) {}

  async update({ request, response }: HttpContext) {
    try {
      const body = await guildsValidator.validate(request.body())

      const bot = await this.botRepository.findByDate(DateTime.now().toFormat('yyyy-MM-dd'))

      if (!bot) {
        await this.botRepository.create({
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          newDate: new Date(),
          guilds: body,
          interactions: [],
          users: 0,
        })
      } else {
        this.botRepository.update(bot, { guilds: body })
      }

      return response.ok({ message: 'Guilds updated' })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.unprocessableEntity(error.messages)
      }

      return response.badRequest({ message: 'Une erreur inconnue est survenue' })
    }
  }
}
