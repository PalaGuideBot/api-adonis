import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/generate-token', [controllers.link.Token, 'generate']).as('generate')
    router.post('/verify-token', [controllers.link.Token, 'verify']).as('verify')
    router.get('/discord/:discordId', [controllers.link.Discord, 'show']).as('discord.show')
    router.delete('/discord/:discordId', [controllers.link.Discord, 'remove']).as('discord.remove')
    router.get('/discord', [controllers.link.Discord, 'index']).as('discord.index')
    router
      .get('/minecraft/:minecraftUUID', [controllers.link.Minecraft, 'show'])
      .as('minecraft.show')
    router
      .delete('/minecraft/:minecraftUUID', [controllers.link.Minecraft, 'remove'])
      .as('minecraft.remove')
    router.get('/minecraft', [controllers.link.Minecraft, 'index']).as('minecraft.index')
  })
  .prefix('link')
  .as('link')
  .middleware(middleware.auth())
