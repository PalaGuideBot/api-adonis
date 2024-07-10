import emitter from '@adonisjs/core/services/emitter'

const PlayerNotFound = () => import('../app/unique/listeners/player_not_found.js')

emitter.on('unique:user:not-found', [PlayerNotFound, 'handle'])
