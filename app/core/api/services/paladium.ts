import ky, { HTTPError } from 'ky'
import env from '#start/env'
import { playerNameToUuidValidator } from '../validators/paladium/player_name_to_uuid.js'

const paladiumClient = ky.create({
  prefixUrl: env.get('PALADIUM_BASE_URL'),
})

const mojangClient = ky.create({
  prefixUrl: env.get('MOJANG_API_URL'),
})

export class PaladiumApi {
  async playerNameToUUID(username: string) {
    try {
      const response = await mojangClient.get(`users/profiles/minecraft/${username}`)
      const data = (await response.json()) as Record<string, string>

      await playerNameToUuidValidator.validate(data)

      return data.id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }
}
