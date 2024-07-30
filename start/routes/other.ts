import router from '@adonisjs/core/services/router'

const DatabaseController = () => import('#other/controllers/database')

router.get('/database', [DatabaseController, 'check'])

router.get('/home', async ({ response }) => {
  response.json({ message: 'Home' })
})

router.get('/status', async ({ response }) => {
  response.json({ message: 'Status' })
})

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
