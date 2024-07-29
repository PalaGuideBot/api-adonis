import router from '@adonisjs/core/services/router'

router.get('/home', async ({ response }) => {
  response.json({ message: 'Home' })
})
