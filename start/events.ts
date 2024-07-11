import emitter from '@adonisjs/core/services/emitter'

const PlayerNotFound = () => import('#unique/listeners/player_not_found')

emitter.on('unique:user:not-found', [PlayerNotFound, 'handle'])
