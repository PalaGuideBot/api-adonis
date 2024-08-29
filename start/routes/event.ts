import router from '@adonisjs/core/services/router'

const EventController = () => import('#event/controllers/event_controller')

router
  .group(() => {
    router.get('/qdf', [EventController, 'factionQuest']).as('faction.quest')
  })
  .as('events')
  .prefix('/events')
