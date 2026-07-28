import { type HttpContext } from '@adonisjs/core/http'

import buildings from '#paladium/contents/clicker/buildings'
import upgrades from '#paladium/contents/clicker/upgrades'

export default class ClickerController {
  async buildings({ response }: HttpContext) {
    return response.ok(buildings)
  }

  async upgrades({ response }: HttpContext) {
    /* const result = [
      ...upgrades.buildings.map((upgrade) => ({ type: 'building', ...upgrade })),
      ...upgrades.categories.map((upgrade) => ({ type: 'category', ...upgrade })),
      ...upgrades.clicks.map((upgrade) => ({ type: 'click', ...upgrade })),
      ...upgrades.globals.map((upgrade) => ({ type: 'global', ...upgrade })),
      ...upgrades.many.map((upgrade) => ({ type: 'many', ...upgrade })),
      ...upgrades.posteriors.map((upgrade) => ({ type: 'posterior', ...upgrade })),
      ...upgrades.terrains.map((upgrade) => ({ type: 'terrain', ...upgrade })),
    ] */

    return response.ok(upgrades)
  }
}
