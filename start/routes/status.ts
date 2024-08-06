import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const StatusController = () => import('#status/controllers/status_controller')

router
  .group(() => {
    router.get('/database', [StatusController, 'database'])
    router.get('/paladium', [StatusController, 'paladium'])
  })
  .prefix('status')
  .middleware(middleware.auth())
