import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const StaffController = () => import('#role/controllers/staff_controller')
const ContributorController = () => import('#role/controllers/contributor_controller')

router
  .group(() => {
    router.post('/staff/:discordId', [StaffController, 'add'])
    router.delete('/staff/:discordId', [StaffController, 'delete'])
    router.get('/staff/', [StaffController, 'show'])

    router.post('/contributor/:discordId', [ContributorController, 'add'])
    router.delete('/contributor/:discordId', [ContributorController, 'delete'])
    router.get('/contributor/', [ContributorController, 'show'])
  })
  .prefix('role')
  .middleware(middleware.auth())
