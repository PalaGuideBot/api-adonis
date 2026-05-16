import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const EventController = () => import('#event/controllers/event_controller')

router
  .group(() => {
    router.get('/qdf', [EventController, 'factionQuest']).as('faction.quest')
    router
      .get('/on-your-marks', [EventController, 'factionOnYourMarks'])
      .as('faction.on-your-marks')
    router.get('/daily', [EventController, 'dailyEvents']).as('daily')
  })
  .as('events')
  .prefix('/events')
  .middleware(middleware.auth())
