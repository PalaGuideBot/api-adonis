import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:category', [controllers.leaderboard.Leaderboard, 'showGlobal']).as('global')
    router
      .get('/trixium/:category', [controllers.leaderboard.Leaderboard, 'showTrixium'])
      .as('trixium')
  })
  .prefix('leaderboard')
  .as('leaderboard')
  .middleware(middleware.auth())
