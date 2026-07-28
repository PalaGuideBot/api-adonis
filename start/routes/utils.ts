import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/jobs/calculate', [controllers.utils.Jobs, 'calculate']).as('jobs.calculate')
    router.get('/jobs/items', [controllers.utils.Jobs, 'items']).as('jobs.items')
    router.get('/jobs/levels', [controllers.utils.Jobs, 'levels']).as('jobs.levels')
    router.post('/pog/calculate', [controllers.utils.Pog, 'calculate']).as('pog.calculate')
    router.get('/pog/items', [controllers.utils.Pog, 'items']).as('pog.items')
    router
      .get('/clicker/buildings', [controllers.utils.Clicker, 'buildings'])
      .as('clicker.buildings')
    router.get('/clicker/upgrades', [controllers.utils.Clicker, 'upgrades']).as('clicker.upgrades')
    router.get('/craft/:item/:amount', [controllers.utils.Craft, 'craft']).as('craft.craft')
    router.get('/craft/items', [controllers.utils.Craft, 'items']).as('craft.items')
  })
  .prefix('utils')
  .as('utils')
  .middleware(middleware.auth())
