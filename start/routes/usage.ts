import router from '@adonisjs/core/services/router'

const UsageController = () => import('#usage/controllers/statistics_controller')

router
  .group(() => {
    router.get('/statistics', [UsageController, 'show'])
  })
  .prefix('usage')
