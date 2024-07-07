import { db } from '#core/services/db'
import { HttpContext } from '@adonisjs/core/http'

export default class LeaderboardController {
  async show({ response, params }: HttpContext) {
    const id = params.id as string
    const leaderboard = await db.leaderboardClicker.findMany()
    return response.ok(leaderboard)
  }
}
