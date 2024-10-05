interface Craft {
  craft: (string | null)[]
  utils: string
  result: {
    item: string
    amount: number
  }
}

const items: Craft[] = [
  {
    craft: ['planks', 'planks', null, 'planks', 'planks', null, null, null, null],
    utils: 'table',
    result: {
      item: 'crafting_table',
      amount: 1,
    },
  },
  {
    craft: ['planks', null, null, 'planks', null, null, null, null, null],
    utils: 'table',
    result: {
      item: 'stick',
      amount: 4,
    },
  },
]

export { items }
