import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsageController = () => import('#usage/controllers/statistics_controller')

router
  .group(() => {
    router.get('/statistics', [UsageController, 'show']).as('statistics')
  })
  .prefix('usage')
  .as('usage')
  .middleware(middleware.auth())
