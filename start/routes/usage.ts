import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/statistics', [controllers.usage.Statistics, 'show']).as('statistics')
  })
  .prefix('usage')
  .as('usage')
  .middleware(middleware.auth())
