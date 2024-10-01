import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ClickerController = () => import('#utils/controllers/clicker_controller')
const JobsController = () => import('#utils/controllers/jobs_controller')
const PogController = () => import('#utils/controllers/pogs_controller')

router
  .group(() => {
    router.post('/jobs/calculate', [JobsController, 'calculate']).as('jobs.calculate')
    router
      .post('/jobs/reverse-calculate', [JobsController, 'reverseCalculate'])
      .as('jobs.reverse-calculate')
    router.get('/jobs/items', [JobsController, 'items']).as('jobs.items')
    router.post('/pogs/calculate', [PogController, 'calculate']).as('pog.calculate')
    router.get('/clicker/buildings', [ClickerController, 'buildings']).as('clicker.buildings')
    router.get('/clicker/upgrades', [ClickerController, 'upgrades']).as('clicker.upgrades')
  })
  .prefix('utils')
  .as('utils')
  .middleware(middleware.auth())
