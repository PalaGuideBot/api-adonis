import { inject } from '@adonisjs/core'

import { PlayerRepository } from '#unique/repositories/player_repository'

@inject()
export default class PlayerNotFound {
  constructor(private playerRepository: PlayerRepository) {}

  async handle(username: string) {
    try {
      await this.playerRepository.create(username)
    } catch {}
  }
}
