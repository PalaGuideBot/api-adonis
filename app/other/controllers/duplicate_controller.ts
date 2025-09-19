import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { DuplicateRepository } from '#other/repositories/duplicate_repository'
import { duplicateCreateValidator } from '#other/validators/duplicate_validator'

@inject()
export default class DuplicateController {
  constructor(private duplicateRepository: DuplicateRepository) {}

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(duplicateCreateValidator)
    const doc = await this.duplicateRepository.add(payload)
    return response.created({ id: doc._id, uuid: doc.uuid })
  }

  async index({ response }: HttpContext) {
    const docs = await this.duplicateRepository.list()
    return response.ok(docs.map((d) => ({ id: d._id, uuid: d.uuid })))
  }
}
