import { HttpContext } from '@adonisjs/core/http'

import { CURRENT_SEASON, getSeasons } from '#paladium/contents/seasons'

export default class PaladiumController {
  seasons({ response }: HttpContext) {
    const seasons = getSeasons()
    return response.ok({ current: CURRENT_SEASON, seasons })
  }
}
