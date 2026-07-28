import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get('/update', [controllers.other.Update, 'show']).as('update').middleware(middleware.auth())
router
  .group(() => {
    router.get('/', [controllers.other.Giveaway, 'index']).as('index')
    router.get('/active', [controllers.other.Giveaway, 'active']).as('active')
    router.get('/check', [controllers.other.Giveaway, 'check']).as('check')
    router.get('/:id', [controllers.other.Giveaway, 'show']).as('show')
    router.post('/', [controllers.other.Giveaway, 'create']).as('create')
    router.put('/:id', [controllers.other.Giveaway, 'update']).as('update')
    router.delete('/:id', [controllers.other.Giveaway, 'delete']).as('delete')
    router.post('/:id/participate', [controllers.other.Giveaway, 'participate']).as('participate')
    router.post('/:id/leave', [controllers.other.Giveaway, 'leave']).as('leave')
    router.post('/:id/draw', [controllers.other.Giveaway, 'draw']).as('draw')
    router.get('/:id/state/:discordId', [controllers.other.Giveaway, 'state']).as('state')
  })
  .prefix('giveaways')
  .as('giveaways')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get('/duplicates', [controllers.other.Duplicate, 'index']).as('duplicates.index')
    router.post('/duplicates', [controllers.other.Duplicate, 'create']).as('duplicates.create')
  })
  .prefix('other')
  .as('other')
  .middleware(middleware.auth())
