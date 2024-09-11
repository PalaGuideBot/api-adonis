import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const JobsController = () => import('#utils/controllers/jobs_controller')
const PogController = () => import('#utils/controllers/pogs_controller')

router
  .group(() => {
    router.post('/jobs/calculate', [JobsController, 'calculate']).as('jobs.calculate')
    router
      .post('/jobs/reverse-calculate', [JobsController, 'reverseCalculate'])
      .as('jobs.reverse-calculate')
    router.get('/jobs/items', [JobsController, 'itemListing']).as('jobs.items')
    router.post('/pogs/calculate', [PogController, 'calculate']).as('pog.calculate')
  })
  .prefix('utils')
  .as('utils')
  .middleware(middleware.auth())
