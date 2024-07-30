import { HttpContext } from '@adonisjs/core/http'

import { DateTime } from 'luxon'
import { db } from '#core/services/db'
import { commandsValidator } from '#bot/validators/commands_validator'

export default class CommandsController {
  async push({ response, request }: HttpContext) {
    const body = await request.validateUsing(commandsValidator)
    const { name } = body

    const dateExist = await db.bot.findOne({
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    })

    if (!dateExist) {
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
      const interaction = dateExist.interactions.find((item) => item.name === name)

      if (interaction) {
        interaction.count += 1
      } else {
        dateExist.interactions.push({
          name,
          count: 1,
        })
      }

      await dateExist.save()
    }

    return response.ok({ message: 'Interaction added' })
  }
}
