import stores from '#cache/stores'
import app from '@adonisjs/core/services/app'
import { BentoCache } from 'bentocache'

let cache: BentoCache<typeof stores>

app.booted(async () => {
  cache = await app.container.make('cache')
})

export { cache as default }
