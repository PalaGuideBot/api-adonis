import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/generate-token', async ({ response }) => {
      response.json({ message: 'Generate Token' })
    })
    router.post('/verify-token', async ({ response }) => {
      response.json({ message: 'Verify Token' })
    })
    router.get('/discord', async ({ response }) => {
      response.json({ message: 'Discord' })
    })
    router.delete('/discord', async ({ response }) => {
      response.json({ message: 'Discord' })
    })
    router.get('/minecraft', async ({ response }) => {
      response.json({ message: 'Minecraft' })
    })
    router.delete('/minecraft', async ({ response }) => {
      response.json({ message: 'Minecraft' })
    })
  })
  .prefix('link')
