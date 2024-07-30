import router from '@adonisjs/core/services/router'

const DatabaseController = () => import('#other/controllers/database_controller')
const HomeController = () => import('#other/controllers/home_controller')

router.get('/database', [DatabaseController, 'check'])

router.get('/home', [HomeController, 'show'])

router.get('/status', async ({ response }) => {
  response.json({ message: 'Status' })
})

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
