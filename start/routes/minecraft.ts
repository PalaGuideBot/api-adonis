import router from '@adonisjs/core/services/router'

const TokenController = () => import('#link/controllers/token_controller')
const DiscordController = () => import('#link/controllers/discord_controller')
const MinecraftController = () => import('#link/controllers/minecraft_controller')

router
  .group(() => {
    router.post('/generate-token', [TokenController, 'generate'])
    router.post('/verify-token', [TokenController, 'verify'])
    router.get('/discord/:discordId', [DiscordController, 'show'])
    router.delete('/discord/:discordId', [DiscordController, 'remove'])
    router.get('/minecraft/:minecraftUUID', [MinecraftController, 'show'])
    router.delete('/minecraft/:minecraftUUID', [MinecraftController, 'remove'])
  })
  .prefix('link')
