import router from '@adonisjs/core/services/router'

const PlayerController = () => import('#unique/controllers/player_controller')
const FactionController = () => import('#unique/controllers/faction_controller')

router
  .group(() => {
    router.get(':username', [PlayerController, 'show'])
    router.post(':username', [PlayerController, 'create'])
  })
  .prefix('players')

router
  .group(() => {
    router.get(':name', [FactionController, 'show'])
    router.post(':name', [FactionController, 'create'])
  })
  .prefix('factions')
