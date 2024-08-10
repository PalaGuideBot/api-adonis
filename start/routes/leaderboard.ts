import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LeaderboardController = () => import('#leaderboard/controllers/leaderboard_controller')

router
  .group(() => {
    router.get('/:category', [LeaderboardController, 'showGlobal']).as('global')
    router.get('/trixium/:category', [LeaderboardController, 'showTrixium']).as('trixium')
  })
  .prefix('leaderboard')
  .as('leaderboard')
  .middleware(middleware.auth())
