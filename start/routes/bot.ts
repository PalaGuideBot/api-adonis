import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/commands', [controllers.bot.Commands, 'update'])
    router.post('/guilds', [controllers.bot.Guilds, 'update'])
    router.post('/users', [controllers.bot.Users, 'update'])
    router.get('/statistics', [controllers.bot.Statistics, 'index']).as('bot.statistics')
  })
  .prefix('bot')
  .middleware(middleware.auth())
