import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const DuplicateController = () => import('#other/controllers/duplicate_controller')

const GiveawayController = () => import('#other/controllers/giveaway_controller')
const UpdateController = () => import('#other/controllers/update_controller')

router.get('/update', [UpdateController, 'show']).as('update').middleware(middleware.auth())

router
  .group(() => {
    router.get('/', [GiveawayController, 'index']).as('index')
    router.get('/active', [GiveawayController, 'active']).as('active')
    router.get('/check', [GiveawayController, 'check']).as('check')
    router.get('/:id', [GiveawayController, 'show']).as('show')
    router.post('/', [GiveawayController, 'create']).as('create')
    router.put('/:id', [GiveawayController, 'update']).as('update')
    router.delete('/:id', [GiveawayController, 'delete']).as('delete')
    router.post('/:id/participate', [GiveawayController, 'participate']).as('participate')
    router.post('/:id/leave', [GiveawayController, 'leave']).as('leave')
    router.post('/:id/draw', [GiveawayController, 'draw']).as('draw')
    router.get('/:id/state/:discordId', [GiveawayController, 'state']).as('state')
  })
  .prefix('giveaways')
  .as('giveaways')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get('/duplicates', [DuplicateController, 'index']).as('duplicates.index')
    router.post('/duplicates', [DuplicateController, 'create']).as('duplicates.create')
  })
  .prefix('other')
  .as('other')
  .middleware(middleware.auth())
