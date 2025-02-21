import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PaladiumController = () => import('#paladium/controllers/paladium_controller')

router
  .group(() => {
    router.get('/seasons', [PaladiumController, 'seasons']).as('seasons')
  })
  .prefix('paladium')
  .as('paladium')
  .middleware(middleware.auth())
