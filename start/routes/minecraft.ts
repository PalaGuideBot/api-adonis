import router from '@adonisjs/core/services/router'

const tokenController = () => import('#link/controllers/token_controller')
const discordController = () => import('#link/controllers/discord_controller')
const minecraftController = () => import('#link/controllers/minecraft_controller')

router
  .group(() => {
    router.post('/generate-token', [tokenController, 'generate'])
    router.post('/verify-token', [tokenController, 'verify'])
    router.get('/discord/:discordId', [discordController, 'show'])
    router.delete('/discord/:discordId', [discordController, 'remove'])
    router.get('/minecraft/:minecraftUUID', [minecraftController, 'show'])
    router.delete('/minecraft/:minecraftUUID', [minecraftController, 'remove'])
  })
  .prefix('link')
