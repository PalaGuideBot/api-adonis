import router from '@adonisjs/core/services/router'

router.get('/database', async ({ response }) => {
  response.json({ message: 'Database' })
})
