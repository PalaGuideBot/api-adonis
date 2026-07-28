import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [controllers.unique.Player, 'index']).as('players.index')
    router.post('/', [controllers.unique.Player, 'search']).as('players.search')
    router
      .post(':uuid/views', [controllers.unique.Player, 'incrementViews'])
      .as('players.views.increment')
    router.get(':username', [controllers.unique.Player, 'show']).as('players')
    router.post(':username', [controllers.unique.Player, 'create'])
    router.get(':username/clicker', [controllers.unique.Player, 'clicker']).as('players.clicker')
    router.get(':username/flags', [controllers.unique.Player, 'flags']).as('players.flags')
    router.get(':username/jobs', [controllers.unique.Player, 'jobs']).as('players.jobs')
    router.get(':username/wrapped', [controllers.unique.Player, 'wrapped']).as('players.wrapped')
    router.get(':uuid/views', [controllers.unique.Player, 'showViews']).as('players.views')
  })
  .prefix('players')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get(':name', [controllers.unique.Faction, 'show']).as('factions')
    router.post(':name', [controllers.unique.Faction, 'create'])
  })
  .prefix('factions')
  .middleware(middleware.auth())
