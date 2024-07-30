import router from '@adonisjs/core/services/router'

const DatabaseController = () => import('#other/controllers/database_controller')
const HomeController = () => import('#other/controllers/home_controller')
const StatusController = () => import('#other/controllers/status_controller')

router.get('/database', [DatabaseController, 'check'])

router.get('/home', [HomeController, 'show'])

router.get('/status', [StatusController, 'show'])

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
