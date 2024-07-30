import { HttpContext } from '@adonisjs/core/http'

import { DateTime } from 'luxon'
import { db } from '#core/services/db'
import { guildsValidator } from '#bot/validators/guilds_validator'

export default class GuildsController {
  async create({ request, response }: HttpContext) {
    const body = await request.validateUsing(guildsValidator)

    const dateExist = await db.bot.findOne({
      date: DateTime.now().toFormat('yyyy-MM-dd'),
    })

    if (!dateExist) {
      const newBot = new db.bot({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        guilds: body,
      })

      await newBot.save()
    } else {
      dateExist.set({ guilds: body })

      await dateExist.save()
    }

    return response.ok({ message: 'Guilds added' })
  }
}
