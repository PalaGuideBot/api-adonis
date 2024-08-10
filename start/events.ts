import emitter from '@adonisjs/core/services/emitter'

const PlayerNotFound = () => import('#unique/listeners/player_not_found')
const FactionNotFound = () => import('#unique/listeners/faction_not_found')
const InterceptEndpoint = () => import('#usage/listeners/intercept_endpoint')

emitter.on('unique:user:not-found', [PlayerNotFound, 'handle'])
emitter.on('unique:faction:not-found', [FactionNotFound, 'handle'])

emitter.on('http:request_completed', [InterceptEndpoint, 'handle'])
