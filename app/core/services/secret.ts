import { Secret } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

let secret: Map<string, Secret<string>>

app.booted(async () => {
  secret = await app.container.make('secret')
})

export { secret as default }
