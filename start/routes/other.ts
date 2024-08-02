import router from '@adonisjs/core/services/router'

const UpdateController = () => import('#other/controllers/update_controller')

router.get('/update', [UpdateController, 'show'])
