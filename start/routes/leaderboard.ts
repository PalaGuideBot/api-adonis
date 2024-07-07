const LeaderboardController = () => import('#leaderboard/controllers/leaderboard_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/:id', [LeaderboardController, 'show'])
  })
  .prefix('leaderboard')
