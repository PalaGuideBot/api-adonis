import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/commands', async ({ response }) => {
      response.json({ message: 'Commands' })
    })
    router.post('/guilds', async ({ response }) => {
      response.json({ message: 'Guilds' })
    })
  })
  .prefix('bot')
