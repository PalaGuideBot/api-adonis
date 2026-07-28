import ky, { HTTPError } from 'ky'

import { imageValidator, minecraftItemValidator } from '#paladium/validators/image'
import env from '#start/env'

const imageClient = ky.create({
  prefix: env.get('PALAGUIDEBOT_IMAGE_URL'),
  timeout: 10000,
  headers: {
    authorization: 'Bearer ' + env.get('PALAGUIDEBOT_IMAGE_KEY'),
  },
})

export class ImageService {
  async getOrCreateEmblem(body: number[]) {
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

  async getMinecraftItem(id: string) {
    try {
      const response = await imageClient.get(
        `minecraft/items/${encodeURIComponent(id)}/informations`
      )
      const data = await response.json()

      return await minecraftItemValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Error(`Minecraft item with id "${id}" not found`)
      }
      throw error
    }
  }

  async getMinecraftEntity(id: string) {
    try {
      const response = await imageClient.get(
        `minecraft/entities/${encodeURIComponent(id)}/informations`
      )
      const data = await response.json()

      return await minecraftItemValidator.validate(data)
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 404) {
        throw new Error(`Minecraft entity with id "${id}" not found`)
      }
      throw error
    }
  }

  async getCraftImage(
    table: string,
    craft: (string | null)[],
    item: string,
    amount: number
  ): Promise<string | undefined> {
    try {
      const queryString = craft.map((craftItem) => `items[]=${craftItem}`).join('&')
      const response = await imageClient.get(
        `craft/${table}/${item}?${queryString}&amount=${amount}`
      )

      if (response.ok) {
        return response.url
      }
    } catch (error: unknown) {
      if (error instanceof HTTPError && error.response.status === 404) {
        console.log('URL not found: ', error.request.url)
        throw new Error('Craft image not found')
      }
      throw error
    }
  }
}
