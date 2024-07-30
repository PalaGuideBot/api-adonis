import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { DateTime } from 'luxon'
import { db } from '#core/services/db'
import { guildsValidator } from '#bot/validators/guilds_validator'

@inject()
export default class GuildsController {
  constructor() {}

  async create({ request, response }: HttpContext) {
    const guilds = request.body()

    try {
      const validation = await guildsValidator.validate(guilds)
      if (validation instanceof Error) {
        return response.badRequest({ message: validation.message })
      }

      const dateExist = await db.bot.findOne({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
      })

      if (!dateExist) {
        const newBot = new db.bot({
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          guilds: validation,
        })

        await newBot.save()
      } else {
        dateExist.set({ guilds: validation })

        await dateExist.save()
      }

      return response.ok({ message: 'Guilds added' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
