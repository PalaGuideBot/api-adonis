import router from '@adonisjs/core/services/router'

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
