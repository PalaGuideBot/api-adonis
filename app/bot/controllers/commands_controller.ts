import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { BotRepository } from '#bot/repositories/bot_repository'
import { commandsValidator } from '#bot/validators/commands_validator'

@inject()
export default class CommandsController {
  constructor(private botRepository: BotRepository) {}

  async update({ response, request }: HttpContext) {
    const body = await request.validateUsing(commandsValidator)
    const { name } = body

    const bot = await this.botRepository.findByDate(DateTime.now().toFormat('yyyy-MM-dd'))

    if (!bot) {
      await this.botRepository.create({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        newDate: new Date(),
        guilds: [],
        interactions: [{ name, count: 1 }],
      })
    } else {
      const interaction = bot.interactions.find((item) => item.name === name)
      let data = {}

      if (interaction) {
        data = {
          interations: bot.interactions.map((item) => {
            if (item.name === name) {
              item.count += 1
            }
            return item
          }),
        }
      } else {
        data = {
          interactions: [...bot.interactions, { name, count: 1 }],
        }
      }

      await this.botRepository.update(bot, data)
    }

    return response.ok({ message: 'Interaction added' })
  }
}
