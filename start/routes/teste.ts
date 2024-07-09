import router from '@adonisjs/core/services/router'

import { MojangService } from '#minecraft/services/mojang'
import { PaladiumService } from '#paladium/services/paladium'

// Initialize the Paladium and Mojang services
const Paladium = new PaladiumService()
const Mojang = new MojangService()

// Status route
router.get('/status', async ({ response }) => {
  try {
    const result = await Paladium.getStatus()
    response.json(result)
  } catch (error) {
    response.status(500).send(error.message)
  }
})

// Player routes
router
  .group(() => {
    router.get('/name', async ({ response }) => {
      try {
        const result = await Mojang.getUUIDByUsername('tonykun7')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/profile', async ({ response }) => {
      try {
        const result = await Paladium.getPlayerProfile('tonykun7')
        response.json(result)
      } catch (error) {
        console.log(error)
        response.json(error)
      }
    })

    router.get('/profile/rank', async ({ response }) => {
      try {
        const result = await Paladium.getPlayerRank('b38dc660-1e1e-4272-9ed9-d7acfe27c913')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/profile/trixium', async ({ response }) => {
      try {
        const result = await Paladium.getPlayerTrixiumRank('b38dc660-1e1e-4272-9ed9-d7acfe27c913')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/profile/achievements', async ({ response }) => {
      try {
        const result = await Paladium.getPlayerAchievements('b38dc660-1e1e-4272-9ed9-d7acfe27c913')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })
  })
  .prefix('player')

// Faction routes
router
  .group(() => {
    router.get('/profile', async ({ response }) => {
      try {
        const result = await Paladium.getFactionProfile('rarecrew')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/profile/player', async ({ response }) => {
      try {
        const result = await Paladium.getFactionMembers('rarecrew')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })
  })
  .prefix('faction')
