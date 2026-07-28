import emitter from '@adonisjs/core/services/emitter'

import { listeners } from '#generated/listeners'

emitter.on('unique:user:not-found', [listeners.unique.PlayerNotFoundListener, 'handle'])
emitter.on('unique:faction:not-found', [listeners.unique.FactionNotFoundListener, 'handle'])

emitter.on('http:request_completed', [listeners.usage.InterceptEndpointListener, 'handle'])
