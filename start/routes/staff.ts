import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/statistics', async ({ response }) => {
      response.json({ message: 'Statistics' })
    })
    router.get('/ws', async ({ response }) => {
      response.json({ message: 'Websocket' })
    })
  })
  .prefix('staff')
