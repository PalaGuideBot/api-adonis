import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import cache from '#cache/cache'
import { PaladiumService } from '#paladium/services/paladium'

@inject()
export default class EventController {
  constructor(private paladiumService: PaladiumService) {}

  async factionQuest({ response }: HttpContext) {
    const quest = await cache.getOrSet({
      key: 'events:faction-quest',
      factory: () => this.paladiumService.getFactionQuest(),
    })

    return response.ok(quest)
  }

  async factionOnYourMarks({ response }: HttpContext) {
    const onYourMarks = await cache.getOrSet({
      key: 'events:faction-on-your-marks',
      factory: () => this.paladiumService.getFactionOnYourMarks(),
    })

    return response.ok(onYourMarks)
  }
}
