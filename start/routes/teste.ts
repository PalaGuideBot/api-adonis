import { PaladiumAPI } from '#paladium/services/paladium'
import router from '@adonisjs/core/services/router'

// Initialize the Paladium API
const Paladium = new PaladiumAPI()

// Leaderboard routes
router
  .group(() => {
    router.get('/factions', async ({ response }) => {
      try {
        const result = await Paladium.getFactionsLeaderboard()
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/category', async ({ response }) => {
      try {
        const result = await Paladium.getRankingCategory('money')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })

    router.get('/trixium/players', async ({ response }) => {
      try {
        const result = await Paladium.getRankingTrixium('player')
        response.json(result)
      } catch (error) {
        response.json(error)
      }
    })

    router.get('/trixium/factions', async ({ response }) => {
      try {
        const result = await Paladium.getRankingTrixium('faction')
        response.json(result)
      } catch (error) {
        response.status(500).send(error.message)
      }
    })
  })
  .prefix('leaderboard')

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
        const result = await Paladium.getPlayerNameToUUID('tonykun7')
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
        const result = await Paladium.getPlayerTrixium('b38dc660-1e1e-4272-9ed9-d7acfe27c913')
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
