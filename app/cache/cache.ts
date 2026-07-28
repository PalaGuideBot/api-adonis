import app from '@adonisjs/core/services/app'
import { type BentoCache } from 'bentocache'

import type stores from '#cache/stores'

let cache: BentoCache<typeof stores>

app.booted(async () => {
  cache = await app.container.make('cache')
})

export { cache as default }
