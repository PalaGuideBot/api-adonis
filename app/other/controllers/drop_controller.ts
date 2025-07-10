import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { DropRepository } from '#other/repositories/drop_repository'
import {
  addWinnerDropValidator,
  createDropValidator,
  participateDropValidator,
  updateDropValidator,
} from '#other/validators/drop_validator'

@inject()
export default class DropController {
  constructor(private dropRepository: DropRepository) {}

  async index({ response }: HttpContext) {
    const drops = await this.dropRepository.findAll()

    return response.ok(drops)
  }

  async show({ response, params }: HttpContext) {
    const drop = await this.dropRepository.findById(params.id)

    if (!drop) {
      return response.notFound({ message: 'Drop not found' })
    }

    return response.ok(drop)
  }

  async active({ response }: HttpContext) {
    const drop = await this.dropRepository.findActive()

    return response.ok(drop)
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createDropValidator)
    const drop = await this.dropRepository.create(payload)

    return response.created(drop)
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateDropValidator)
    const drop = await this.dropRepository.update(params.id, payload)

    return response.ok(drop)
  }

  async delete({ response, params }: HttpContext) {
    await this.dropRepository.delete(params.id)

    return response.noContent()
  }

  async participate({ request, response, params }: HttpContext) {
    const { id } = await request.validateUsing(participateDropValidator)
    const drop = await this.dropRepository.addParticipant(params.id, id)

    return response.ok(drop)
  }

  async addWinner({ request, response, params }: HttpContext) {
    const { id } = await request.validateUsing(addWinnerDropValidator)
    const drop = await this.dropRepository.addWinner(params.id, id)

    return response.ok(drop)
  }
}
