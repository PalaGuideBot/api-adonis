import router from '@adonisjs/core/services/router'

router.get('/database', async ({ response }) => {
  response.json({ message: 'Database' })
})

router.get('/home', async ({ response }) => {
  response.json({ message: 'Home' })
})

router.get('/status', async ({ response }) => {
  response.json({ message: 'Status' })
})

router.get('/update', async ({ response }) => {
  response.json({ message: 'Update' })
})
