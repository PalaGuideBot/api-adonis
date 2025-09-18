import env from '#start/env'
import ky, { HTTPError } from 'ky'

type DuplicatePayload = { uuid: string }

export class DuplicateSender {
  protected client = ky.create({
    prefixUrl: env.get('PALADIUM_BASE_URL'),
    timeout: 10000,
    headers: { Authorization: `Bearer ${env.get('PALADIUM_API_KEY')}` },
  })

  async sendMany(duplicates: DuplicatePayload[]) {
    if (duplicates.length === 0) return { ok: true as const }
    try {
      for (const { uuid } of duplicates) {
        await this.client.get(`paladium/player/profile/${uuid}`)
      }
      return { ok: true as const }
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const text = await error.response.text().catch(() => '')
        throw new Error(`Failed to query Paladium: ${error.response.status} ${text}`)
      }
      throw error
    }
  }
}
