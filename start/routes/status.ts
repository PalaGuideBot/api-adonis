import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/database', [controllers.status.Status, 'database']).as('database')
    router.get('/paladium', [controllers.status.Status, 'paladium']).as('paladium')
  })
  .prefix('status')
  .as('status')
  .middleware(middleware.auth())
