import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/generate-token', async ({ response }) => {
      response.json({ message: 'Generate Token' })
    })
    router.post('/verify-token', async ({ response }) => {
      response.json({ message: 'Verify Token' })
    })
    router
      .group(() => {
        router.post('/', async ({ response }) => {
          response.json({ message: 'Create' })
        })
        router.get('/', async ({ response }) => {
          response.json({ message: 'Read' })
        })
      })
      .prefix('discord')
    router
      .group(() => {
        router.post('/', async ({ response }) => {
          response.json({ message: 'Create' })
        })
        router.get('/', async ({ response }) => {
          response.json({ message: 'Read' })
        })
      })
      .prefix('minecraft')
  })
  .prefix('minecraft')
