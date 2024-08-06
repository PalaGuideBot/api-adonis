import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsageController = () => import('#usage/controllers/statistics_controller')

router
  .group(() => {
    router.get('/statistics', [UsageController, 'show'])
  })
  .prefix('usage')
  .middleware(middleware.auth())
