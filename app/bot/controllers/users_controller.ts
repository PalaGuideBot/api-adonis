import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { BotRepository } from '#bot/repositories/bot_repository'
import { usersValidator } from '#bot/validators/users_validator'

@inject()
export default class UsersController {
  constructor(private botRepository: BotRepository) {}

  async update({ request, response }: HttpContext) {
    try {
      const body = await usersValidator.validate(request.body())

      const bot = await this.botRepository.findByDate(DateTime.now().toFormat('yyyy-MM-dd'))

      if (!bot) {
        await this.botRepository.create({
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          newDate: new Date(),
          users: body,
          interactions: [],
          guilds: [],
        })
      } else {
        this.botRepository.update(bot, { users: body })
      }

      return response.ok({ message: 'Users updated' })
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
}
