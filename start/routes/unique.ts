import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PlayerController = () => import('#unique/controllers/player_controller')
const FactionController = () => import('#unique/controllers/faction_controller')

router
  .group(() => {
    router.get('/', [PlayerController, 'index']).as('players.index')
    router.get(':username', [PlayerController, 'show']).as('players')
    router.post(':username', [PlayerController, 'create'])
    router.get(':username/clicker', [PlayerController, 'clicker']).as('players.clicker')
    router.get(':username/flags', [PlayerController, 'flags']).as('players.flags')
    router.get(':username/jobs', [PlayerController, 'jobs']).as('players.jobs')
    router.get(':username/wrapped', [PlayerController, 'wrapped']).as('players.wrapped')
  })
  .prefix('players')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get(':name', [FactionController, 'show']).as('factions')
    router.post(':name', [FactionController, 'create'])
  })
  .prefix('factions')
  .middleware(middleware.auth())
