const LeaderboardController = () => import('#leaderboard/controllers/leaderboard_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/factions', [LeaderboardController, 'factions'])
    router.get('/money', [LeaderboardController, 'money'])
    router.get('/trixium/players', [LeaderboardController, 'trixiumPlayers'])
    router.get('/trixium/factions', [LeaderboardController, 'trixiumFactions'])
  })
  .prefix('leaderboard')
