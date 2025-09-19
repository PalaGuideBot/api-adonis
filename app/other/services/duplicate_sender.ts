import { inject } from '@adonisjs/core'

import { PaladiumService } from '#paladium/services/paladium'

type DuplicatePayload = { uuid: string }

@inject()
export class DuplicateSender {
  constructor(private paladium: PaladiumService) {}

  async sendMany(duplicates: DuplicatePayload[]) {
    if (duplicates.length === 0) return { ok: true as const }
    try {
      for (const { uuid } of duplicates) {
        await this.paladium.getPlayerProfile(uuid)
      }
      return { ok: true as const }
    } catch (error: unknown) {
      throw error
    }
  }
}
