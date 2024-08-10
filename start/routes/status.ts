import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const StatusController = () => import('#status/controllers/status_controller')

router
  .group(() => {
    router.get('/database', [StatusController, 'database']).as('database')
    router.get('/paladium', [StatusController, 'paladium']).as('paladium')
  })
  .prefix('status')
  .as('status')
  .middleware(middleware.auth())
