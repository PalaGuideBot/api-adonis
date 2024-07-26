import emitter from '@adonisjs/core/services/emitter'

const PlayerNotFound = () => import('#unique/listeners/player_not_found')
const FactionNotFound = () => import('#unique/listeners/faction_not_found')

emitter.on('unique:user:not-found', [PlayerNotFound, 'handle'])
emitter.on('unique:faction:not-found', [FactionNotFound, 'handle'])
