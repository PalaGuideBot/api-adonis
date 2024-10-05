import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { CraftRepository } from '#utils/repositories/craft_repository'

@inject()
export default class CraftController {
  constructor(private craftRepository: CraftRepository) {}

  async craft({ response, params }: HttpContext) {
    const { item, amount } = params

    if (!this.craftRepository.getItemExists(item)) {
      return response.badRequest({ message: 'Invalid item' })
    }

    const result = await this.craftRepository.getCraftResult(item, amount)
    if (!result) {
      return response.badRequest({ message: 'Craft result not found' })
    }

    return response.ok(result)
  }

  async items({ response }: HttpContext) {
    const items = this.craftRepository.getItems()

    if (!items.length) {
      return response.badRequest({ message: 'No items found' })
    }

    return response.ok(items)
  }
}
