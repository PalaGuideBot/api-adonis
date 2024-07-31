import router from '@adonisjs/core/services/router'

const StatisticsController = () => import('#bot/controllers/statistics_controller')
const CommandsController = () => import('#bot/controllers/commands_controller')
const GuildsController = () => import('#bot/controllers/guilds_controller')

router
  .group(() => {
    router.post('/commands', [CommandsController, 'update'])
    router.post('/guilds', [GuildsController, 'update'])
    router.get('/statistics', [StatisticsController, 'index'])
  })
  .prefix('bot')
