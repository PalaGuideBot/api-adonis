import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/seasons', [controllers.paladium.Paladium, 'seasons']).as('seasons')
  })
  .prefix('paladium')
  .as('paladium')
  .middleware(middleware.auth())
