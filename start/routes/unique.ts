import router from '@adonisjs/core/services/router'

const PlayerController = () => import('#unique/controllers/player_controller')

router
  .group(() => {
    router.get(':username', [PlayerController, 'show'])
    router.post(':username', [PlayerController, 'create'])
  })
  .prefix('players')
