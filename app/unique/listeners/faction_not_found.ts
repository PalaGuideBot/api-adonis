import { inject } from '@adonisjs/core'

import { FactionRepository } from '#unique/repositories/faction_repository'

@inject()
export default class FactionNotFound {
  constructor(private factionRepository: FactionRepository) {}

  async handle(name: string) {
    try {
      await this.factionRepository.create(name)
    } catch {}
  }
}
