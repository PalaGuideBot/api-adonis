import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [controllers.user.Role, 'index'])
    router.get('/:name', [controllers.user.Role, 'show'])
    router.post('/', [controllers.user.Role, 'create'])
    router.put('/:name', [controllers.user.Role, 'update'])
    router.delete('/:name', [controllers.user.Role, 'delete'])
  })
  .prefix('roles')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get('/', [controllers.user.User, 'index'])
    router.get('/:id', [controllers.user.User, 'show'])
    router.post('/', [controllers.user.User, 'create'])
    router.put('/:id', [controllers.user.User, 'update'])
    router.put('/:id/roles', [controllers.user.User, 'addRoles'])
    router.delete('/:id', [controllers.user.User, 'delete'])
    router.delete('/:id/roles', [controllers.user.User, 'removeRoles'])
  })
  .prefix('users')
  .middleware(middleware.auth())
