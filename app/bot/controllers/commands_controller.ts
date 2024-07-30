import { HttpContext } from '@adonisjs/core/http'

import { DateTime } from 'luxon'
import { db } from '#core/services/db'
import { commandsValidator } from '#bot/validators/commands_validator'

export default class CommandsController {
  async push({ response, request }: HttpContext) {
    const body = await request.validateUsing(commandsValidator)
    const { name } = body

    const bot = await db.bot.findOne({
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    })

    if (!bot) {
      const newBot = new db.bot({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        interactions: [
          {
            name,
            count: 1,
          },
        ],
      })

      await newBot.save()
    } else {
      const interaction = bot.interactions.find((item) => item.name === name)

      if (interaction) {
        interaction.count += 1
      } else {
        bot.interactions.push({
          name,
          count: 1,
        })
      }

      await bot.save()
    }

    return response.ok({ message: 'Interaction added' })
  }
}
