import router from '@adonisjs/core/services/router'

const CommandsController = () => import('#bot/controllers/commands_controller')
const GuildsController = () => import('#bot/controllers/guilds_controller')

router
  .group(() => {
    router.post('commands', [CommandsController, 'push'])
    router.post('guilds', [GuildsController, 'create'])
  })
  .prefix('bot')
