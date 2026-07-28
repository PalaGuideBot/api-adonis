import { inject } from '@adonisjs/core'

import { PlayerRepository } from '#unique/repositories/player_repository'

@inject()
export default class PlayerNotFoundListener {
  constructor(private playerRepository: PlayerRepository) {}

  async handle(username: string) {
    try {
      await this.playerRepository.create(username)
    } catch {}
  }
}
