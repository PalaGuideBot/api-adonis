import router from '@adonisjs/core/services/router'

const StatusController = () => import('#status/controllers/status_controller')

router
  .group(() => {
    router.get('/database', [StatusController, 'database'])
    router.get('/paladium', [StatusController, 'paladium'])
  })
  .prefix('status')
