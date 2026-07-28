import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/qdf', [controllers.event.Event, 'factionQuest']).as('faction.quest')
    router
      .get('/on-your-marks', [controllers.event.Event, 'factionOnYourMarks'])
      .as('faction.on-your-marks')
    router.get('/daily', [controllers.event.Event, 'dailyEvents']).as('daily')
  })
  .as('events')
  .prefix('/events')
  .middleware(middleware.auth())
