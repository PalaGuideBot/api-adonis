import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { GiveawayRepository } from '#other/repositories/giveaway_repository'
import {
  createGiveawayValidator,
  drawGiveawayValidator,
  leaveGiveawayValidator,
  participateGiveawayValidator,
  updateGiveawayValidator,
} from '#other/validators/giveaway_validator'

@inject()
export default class GiveawayController {
  constructor(private giveawayRepository: GiveawayRepository) {}

  async index({ response }: HttpContext) {
    const giveaways = await this.giveawayRepository.findAll()

    return response.ok(giveaways)
  }

  async show({ response, params }: HttpContext) {
    const giveaway = await this.giveawayRepository.findById(params.id)

    if (!giveaway) {
      return response.notFound({ message: 'Giveaway not found' })
    }

    return response.ok(giveaway)
  }

  async active({ response }: HttpContext) {
    const giveaway = await this.giveawayRepository.findActive()

    return response.ok(giveaway)
  }

  async check({ response }: HttpContext) {
    const active = await this.giveawayRepository.checkActive()

    return response.ok({ active })
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createGiveawayValidator)
    const giveaway = await this.giveawayRepository.create(payload)

    return response.created(giveaway)
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateGiveawayValidator)
    const giveaway = await this.giveawayRepository.update(params.id, payload)

    return response.ok(giveaway)
  }

  async delete({ response, params }: HttpContext) {
    await this.giveawayRepository.delete(params.id)

    return response.noContent()
  }

  async participate({ request, response, params }: HttpContext) {
    const { id } = await request.validateUsing(participateGiveawayValidator)
    const giveaway = await this.giveawayRepository.addParticipant(params.id, id)

    return response.ok(giveaway)
  }

  async leave({ request, response, params }: HttpContext) {
    const { id } = await request.validateUsing(leaveGiveawayValidator)
    const giveaway = await this.giveawayRepository.removeParticipant(params.id, id)

    return response.ok(giveaway)
  }

  async draw({ request, response, params }: HttpContext) {
    const { count } = await request.validateUsing(drawGiveawayValidator)
    const winners = await this.giveawayRepository.drawWinners(params.id, count)

    return response.ok(winners)
  }

  async state({ response, params }: HttpContext) {
    const state = await this.giveawayRepository.getUserState(params.id, params.discordId)
    return response.ok(state)
  }
}
