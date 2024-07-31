import router from '@adonisjs/core/services/router'

const DatabaseController = () => import('#other/controllers/database_controller')
const StatusController = () => import('#other/controllers/status_controller')

router.get('/database', [DatabaseController, 'check'])

router.get('/status', [StatusController, 'show'])

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
