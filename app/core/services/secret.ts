import { type Secret } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

let secret: Map<string, Secret<string>>

app.booted(async () => {
  secret = await app.container.make('secret')
})

function findSecretKeyByValue(value: string) {
  return Array.from(secret.entries()).find(([, v]) => v.release() === value)?.[0]
}

export { secret as default, findSecretKeyByValue }
