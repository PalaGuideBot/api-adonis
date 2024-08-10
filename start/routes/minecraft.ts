import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const TokenController = () => import('#link/controllers/token_controller')
const DiscordController = () => import('#link/controllers/discord_controller')
const MinecraftController = () => import('#link/controllers/minecraft_controller')

router
  .group(() => {
    router.post('/generate-token', [TokenController, 'generate']).as('generate')
    router.post('/verify-token', [TokenController, 'verify']).as('verify')
    router.get('/discord/:discordId', [DiscordController, 'show']).as('discord.show')
    router.delete('/discord/:discordId', [DiscordController, 'remove']).as('discord.remove')
    router.get('/minecraft/:minecraftUUID', [MinecraftController, 'show']).as('minecraft.show')
    router
      .delete('/minecraft/:minecraftUUID', [MinecraftController, 'remove'])
      .as('minecraft.remove')
  })
  .prefix('link')
  .as('link')
  .middleware(middleware.auth())
