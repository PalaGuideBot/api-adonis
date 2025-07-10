import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const DropController = () => import('#other/controllers/drop_controller')
const GiveawayController = () => import('#other/controllers/giveaway_controller')
const UpdateController = () => import('#other/controllers/update_controller')

router.get('/update', [UpdateController, 'show']).as('update').middleware(middleware.auth())

router
  .group(() => {
    router.get('/', [DropController, 'index']).as('index')
    router.get('/active', [DropController, 'active']).as('active')
    router.get('/:id', [DropController, 'show']).as('show')
    router.post('/', [DropController, 'create']).as('create')
    router.put('/:id', [DropController, 'update']).as('update')
    router.delete('/:id', [DropController, 'delete']).as('delete')
    router.post('/:id/participate', [DropController, 'participate']).as('participate')
    router.post('/:id/winner', [DropController, 'addWinner']).as('addWinner')
  })
  .prefix('drops')
  .as('drops')
  .middleware(middleware.auth())

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
