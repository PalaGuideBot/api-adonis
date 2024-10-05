import { inject } from '@adonisjs/core'
import { ImageService } from '#paladium/services/image'
import { items } from '#utils/contents/craft'

@inject()
class CraftRepository {
  private itemSet: Set<string>

  constructor(private imageService: ImageService) {
    this.itemSet = new Set(items.map(({ result }) => result.item))
  }

  getItemExists(item: string): boolean {
    return this.itemSet.has(item)
  }

  async getCraftResult(item: string, amount: number) {
    const craft = items.find(({ result }) => result.item === item)
    if (!craft) return undefined

    const { result, craft: craftRecipe } = craft
    const quantity = Math.ceil(amount / result.amount) * result.amount

    const url = await this.imageService.getCraftImage(
      craftRecipe.length !== 9 ? 'palamachine' : 'table',
      craftRecipe,
      result.item,
      quantity
    )

    const craftQuantity = craftRecipe.map((craftItem) => ({
      item: craftItem ?? null,
      amount: craftItem ? Math.ceil(quantity / result.amount) : 0,
    }))

    return { item: result.item, amount: quantity, craft: craftQuantity, url }
  }

  getItems(): string[] {
    return Array.from(this.itemSet)
  }
}

export { CraftRepository }
