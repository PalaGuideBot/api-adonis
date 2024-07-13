import ky, { HTTPError } from 'ky'
import env from '#start/env'

import { imageValidator } from '../validators/image.js'

const meClient = ky.create({
  prefixUrl: env.get('PALAGUIDEBOT_BASE_URL'),
  timeout: 10000,
  headers: {
    authorization: env.get('PALAGUIDEBOT_KEY'),
  },
})

const imageClient = ky.create({
  prefixUrl: env.get('PALAGUIDEBOT_IMAGE_URL'),
  timeout: 10000,
  headers: {
    authorization: env.get('PALAGUIDEBOT_IMAGE_KEY'),
  },
})

export class MeService {
  async postMeNewPlayer(name: string) {
    try {
      const response = await meClient.post('/players/' + name)
      const data = (await response.json()) as Record<string, string>

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Player not found')
      }
    }
  }

  async postMeNewFaction(name: string) {
    try {
      const response = await meClient.post('/factions/' + name)
      const data = (await response.json()) as Record<string, string>

      return data
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Faction not found')
      }
    }
  }

  async postImageEmbleme(body: ArrayBuffer) {
    try {
      const response = await imageClient.post('embleme', { body })
      const data = (await response.json()) as Record<string, string>

      const dataType = await imageValidator.validate(data)

      return dataType
    } catch (e) {
      if (e instanceof HTTPError && e.response.status === 404) {
        throw new Error('Image not found')
      }
    }
  }
}
