import router from '@adonisjs/core/services/router'

router.get('/status', async ({ response }) => {
  response.json({ message: 'Status' })
})
