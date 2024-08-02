import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/statistics', async ({ response }) => {
      response.json({ message: 'Statistics' })
    })
  })
  .prefix('usage')
