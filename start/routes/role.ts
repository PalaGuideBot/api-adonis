import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RoleController = () => import('#role/controllers/role_controller')
const UserController = () => import('#role/controllers/user_controller')

router
  .group(() => {
    router.get('/', [RoleController, 'index'])
    router.get('/:name', [RoleController, 'show'])
    router.post('/', [RoleController, 'create'])
    router.put('/:name', [RoleController, 'update'])
    router.delete('/:name', [RoleController, 'delete'])
  })
  .prefix('roles')
  .middleware(middleware.auth())

router
  .group(() => {
    router.get('/', [UserController, 'index'])
    router.get('/:id', [UserController, 'show'])
    router.post('/', [UserController, 'create'])
    router.put('/:id', [UserController, 'update'])
    router.put('/:id/roles', [UserController, 'addRoles'])
    router.delete('/:id', [UserController, 'delete'])
    router.delete('/:id/roles', [UserController, 'removeRoles'])
  })
  .prefix('users')
  .middleware(middleware.auth())
