import ky, { HTTPError } from 'ky'

import { imageValidator } from '#paladium/validators/image'
import env from '#start/env'

const imageClient = ky.create({
  prefixUrl: env.get('PALAGUIDEBOT_IMAGE_URL'),
  timeout: 10000,
  headers: {
    authorization: 'Bearer ' + env.get('PALAGUIDEBOT_IMAGE_KEY'),
  },
})

export class MeService {
  async postImageEmbleme(body: number[]) {
    try {
      const response = await imageClient.post('emblem', {
        body: JSON.stringify({
          body,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      return await imageValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Error('Image not found')
      }
      throw error
    }
  }
}
