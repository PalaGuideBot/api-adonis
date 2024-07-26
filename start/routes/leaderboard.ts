const LeaderboardController = () => import('#leaderboard/controllers/leaderboard_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:category', [LeaderboardController, 'showGlobal'])
    router.get('/trixium/:category', [LeaderboardController, 'showTrixium'])
  })
  .prefix('leaderboard')
