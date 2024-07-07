import { db } from '#core/services/db'
import { HttpContext } from '@adonisjs/core/http'

const listModel = [
  { id: 'boss', model: db.leaderboardBoss },
  { id: 'chorus', model: db.leaderboardChorus },
  { id: 'clicker', model: db.leaderboardClicker },
  { id: 'egghunt', model: db.leaderboardEggHunt },
  { id: 'end', model: db.leaderboardEnd },
  { id: 'factions', model: db.leaderboardFactions },
  { id: 'koth', model: db.leaderboardKoth },
  { id: 'money', model: db.leaderboardMoney },
  { id: 'trixfaction', model: db.leaderboardTrixiumFaction },
  { id: 'trixuser', model: db.leaderboardTrixiumUser },
]

export default class LeaderboardController {
  async show({ response, params }: HttpContext) {
    const id = params.id as string
    const model = listModel.find((m) => m.id === id)?.model
    if (!model) {
      return response.notFound({ error: 'Model not found' })
    }

    const data = await (model as any).find()
    return response.ok(data)
  }
}
