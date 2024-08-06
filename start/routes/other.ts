import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UpdateController = () => import('#other/controllers/update_controller')

router.get('/update', [UpdateController, 'show']).middleware(middleware.auth())
