import type { JobReward } from '#utils/types'

const jobCategories = ['miner', 'farmer', 'hunter', 'alchemist'] as const

const jobXp: number[] = [
  22123, 40390, 73751, 118886, 176611, 247616, 332507, 431826, 546062, 675669, 821062, 982632,
  1160743, 1355741, 1567953, 1797690, 2045248, 2310912, 2594953,
]

const rewards = {
  paladium: {
    id: 'paladium_ingot',
    label: 'Paladium Ingot',
    type: 'item',
  },
  trixium: {
    id: 'trixium_ingot',
    label: 'Trixium Ingot',
    type: 'item',
  },
  money: {
    id: 'money',
    label: 'Money',
    type: 'currency',
  },
} satisfies Record<string, Pick<JobReward, 'label' | 'id' | 'type'>>

const JOB_MAX_LEVEL = 100

type BuilderOptions = { reward: keyof typeof rewards; quantity?: number }

function rewardBuilder(...options: BuilderOptions[]): JobReward[] {
  return options.map((option) => {
    const reward = rewards[option.reward]

    if ('quantity' in option && option.quantity !== undefined) {
      return {
        ...reward,
        quantity: option.quantity,
      }
    }

    return reward
  })
}

const globalJobRewards: Record<number, JobReward[]> = {
  1: [],
  2: rewardBuilder(
    { reward: 'paladium', quantity: 10 },
    { reward: 'trixium', quantity: 10 },
    { reward: 'money', quantity: 1000 }
  ),
  3: rewardBuilder(
    { reward: 'paladium', quantity: 15 },
    { reward: 'trixium', quantity: 15 },
    { reward: 'money', quantity: 1500 }
  ),
  4: rewardBuilder(
    { reward: 'paladium', quantity: 20 },
    { reward: 'trixium', quantity: 20 },
    { reward: 'money', quantity: 200 }
  ),
  5: rewardBuilder(
    { reward: 'paladium', quantity: 25 },
    { reward: 'trixium', quantity: 25 },
    { reward: 'money', quantity: 2500 }
  ),
  6: rewardBuilder(
    { reward: 'paladium', quantity: 30 },
    { reward: 'trixium', quantity: 30 },
    { reward: 'money', quantity: 3000 }
  ),
  7: rewardBuilder(
    { reward: 'paladium', quantity: 35 },
    { reward: 'trixium', quantity: 35 },
    { reward: 'money', quantity: 3500 }
  ),
  8: rewardBuilder(
    { reward: 'paladium', quantity: 40 },
    { reward: 'trixium', quantity: 40 },
    { reward: 'money', quantity: 4000 }
  ),
  9: rewardBuilder(
    { reward: 'paladium', quantity: 45 },
    { reward: 'trixium', quantity: 45 },
    { reward: 'money', quantity: 4500 }
  ),
  10: rewardBuilder(
    { reward: 'paladium', quantity: 50 },
    { reward: 'trixium', quantity: 50 },
    { reward: 'money', quantity: 5000 }
  ),
  11: rewardBuilder(
    { reward: 'paladium', quantity: 55 },
    { reward: 'trixium', quantity: 55 },
    { reward: 'money', quantity: 5500 }
  ),
  12: rewardBuilder(
    { reward: 'paladium', quantity: 60 },
    { reward: 'trixium', quantity: 60 },
    { reward: 'money', quantity: 6000 }
  ),
  13: rewardBuilder(
    { reward: 'paladium', quantity: 65 },
    { reward: 'trixium', quantity: 65 },
    { reward: 'money', quantity: 6500 }
  ),
  14: rewardBuilder(
    { reward: 'paladium', quantity: 70 },
    { reward: 'trixium', quantity: 70 },
    { reward: 'money', quantity: 7000 }
  ),
  15: rewardBuilder(
    { reward: 'paladium', quantity: 75 },
    { reward: 'trixium', quantity: 75 },
    { reward: 'money', quantity: 7500 }
  ),
  16: rewardBuilder(
    { reward: 'paladium', quantity: 80 },
    { reward: 'trixium', quantity: 80 },
    { reward: 'money', quantity: 8000 }
  ),
  17: rewardBuilder(
    { reward: 'paladium', quantity: 85 },
    { reward: 'trixium', quantity: 85 },
    { reward: 'money', quantity: 8500 }
  ),
  18: rewardBuilder(
    { reward: 'paladium', quantity: 90 },
    { reward: 'trixium', quantity: 90 },
    { reward: 'money', quantity: 9000 }
  ),
  19: rewardBuilder(
    { reward: 'paladium', quantity: 95 },
    { reward: 'trixium', quantity: 95 },
    { reward: 'money', quantity: 9500 }
  ),
  20: rewardBuilder(
    { reward: 'paladium', quantity: 105 },
    { reward: 'trixium', quantity: 105 },
    { reward: 'money', quantity: 10500 }
  ),
}

const rewardsPerJob: Record<(typeof jobCategories)[number], typeof globalJobRewards> = {
  miner: {
    ...globalJobRewards,
  },
  farmer: {
    ...globalJobRewards,
  },
  hunter: {
    ...globalJobRewards,
  },
  alchemist: {
    ...globalJobRewards,
  },
}

const ACTION = {
  SMELT: 'Smelt',
  BREAK: 'Break',
  OBTAIN_FROM_COBBLEBREAKER: 'Obtain from CobbleBreaker',
  KILL: 'Kill',
  FISH: 'Fish',
  CRAFT: 'Craft',
  EXTRACT_FROM_SAP: 'Extract from Sap',
  THROW_IN_A_CAULDRON: 'Throw in a Cauldron',
  CRAFT_IN_PORTAL: 'Craft in Portal',
  CRAFT_IN_A_CAULDRON: 'Craft in a Cauldron',
  CRUSH: 'Crush',
  CONSUMES: 'Consumes',
}

type Item = {
  type: string
  id: string
  action: string
  xp: number
  from: number
  to: number
}

const xpPerItem: Record<(typeof jobCategories)[number], Item[]> = {
  miner: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_miner',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 20,
    },
    { type: 'Candy', id: 'candy_miner', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 20 },
    { type: 'Nether brick', id: 'nether_brick', action: ACTION.SMELT, xp: 0.1, from: 0, to: 20 },
    { type: 'Stone', id: 'stone', action: ACTION.BREAK, xp: 0.5, from: 0, to: 20 },
    { type: 'Charcoal', id: 'charcoal', action: ACTION.SMELT, xp: 6, from: 0, to: 20 },
    { type: 'Andesite', id: 'andesite', action: ACTION.BREAK, xp: 3, from: 0, to: 20 },
    { type: 'Granite', id: 'granite', action: ACTION.BREAK, xp: 3, from: 0, to: 20 },
    { type: 'Diorite', id: 'diorite', action: ACTION.BREAK, xp: 3, from: 0, to: 20 },
    { type: 'Coal Ore', id: 'coal_ore', action: ACTION.BREAK, xp: 4, from: 0, to: 20 },
    {
      type: 'Nether Quartz Ore',
      id: 'nether_quartz_ore',
      action: ACTION.BREAK,
      xp: 6,
      from: 0,
      to: 20,
    },
    { type: 'Obsidian', id: 'obsidian', action: ACTION.BREAK, xp: 6, from: 0, to: 20 },
    {
      type: 'Lapis Lazuli Ore',
      id: 'lapis_lazuli_ore',
      action: ACTION.BREAK,
      xp: 15,
      from: 0,
      to: 20,
    },
    { type: 'Redstone Ore', id: 'redstone_ore', action: ACTION.BREAK, xp: 15, from: 0, to: 20 },
    { type: 'Emerald Ore', id: 'emerald_ore', action: ACTION.BREAK, xp: 50, from: 0, to: 20 },
    { type: 'Iron Ore', id: 'iron_ore', action: ACTION.SMELT, xp: 8, from: 2, to: 20 },
    { type: 'Gold Ore', id: 'gold_ore', action: ACTION.SMELT, xp: 30, from: 4, to: 20 },
    {
      type: 'Amethyst Ore',
      id: 'amethyst_ore',
      action: ACTION.SMELT,
      xp: 35,
      from: 5,
      to: 20,
    },
    {
      type: 'Iron Particle',
      id: 'iron_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 2,
      from: 5,
      to: 20,
    },
    {
      type: 'Gold Particle',
      id: 'gold_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 4,
      from: 5,
      to: 20,
    },
    {
      type: 'Diamond Particle',
      id: 'diamond_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 8,
      from: 5,
      to: 20,
    },
    {
      type: 'Amethyst Particle',
      id: 'amethyst_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 12,
      from: 5,
      to: 20,
    },
    {
      type: 'Titane Particle',
      id: 'titane_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 16,
      from: 5,
      to: 20,
    },
    {
      type: 'Paladium Particle',
      id: 'paladium_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 20,
      from: 5,
      to: 20,
    },
    { type: 'Titane Ore', id: 'titane_ore', action: ACTION.SMELT, xp: 50, from: 7, to: 20 },
    { type: 'Paladium Ore', id: 'paladium_ore', action: ACTION.SMELT, xp: 150, from: 10, to: 20 },
    {
      type: 'Green Paladium Ore',
      id: 'green_paladium_ore',
      action: ACTION.SMELT,
      xp: 200,
      from: 12,
      to: 20,
    },
  ],
  farmer: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_farmer',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 20,
    },
    { type: 'Candy', id: 'candy_farmer', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 20 },
    { type: 'Bread', id: 'bread', action: ACTION.CRAFT, xp: 1, from: 0, to: 20 },
    { type: 'Seed', id: 'seed', action: ACTION.BREAK, xp: 1.5, from: 0, to: 20 },
    { type: 'Potato', id: 'potato', action: ACTION.BREAK, xp: 2, from: 2, to: 20 },
    { type: 'Carrot', id: 'carrot', action: ACTION.BREAK, xp: 2.5, from: 2, to: 20 },
    { type: 'Melon', id: 'melon', action: ACTION.BREAK, xp: 4, from: 3, to: 20 },
    { type: 'Pumpkin', id: 'pumpkin', action: ACTION.BREAK, xp: 5, from: 6, to: 20 },
    {
      type: 'Amethyst Ingot',
      id: 'amethyst_ingot',
      action: ACTION.CRUSH,
      xp: 3,
      from: 8,
      to: 20,
    },
    { type: 'Eggplant', id: 'eggplant', action: ACTION.BREAK, xp: 10, from: 8, to: 20 },
    { type: 'Pumpkin Pie', id: 'pumpkin_pie', action: ACTION.CRAFT, xp: 4, from: 11, to: 20 },
    { type: 'Titane Ingot', id: 'titane_ingot', action: ACTION.CRUSH, xp: 4.5, from: 12, to: 20 },
    { type: 'Chervil', id: 'chervil', action: ACTION.BREAK, xp: 20, from: 12, to: 20 },
    {
      type: 'Paladium Ingot',
      id: 'paladium_ingot',
      action: ACTION.CRUSH,
      xp: 6,
      from: 16,
      to: 20,
    },
    { type: 'Kiwano', id: 'kiwano', action: ACTION.BREAK, xp: 50, from: 16, to: 20 },
  ],
  hunter: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_hunter',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 20,
    },
    { type: 'Candy', id: 'candy_hunter', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 20 },
    { type: 'Snow Golem', id: 'snow_golem', action: ACTION.KILL, xp: 1, from: 0, to: 20 },
    { type: 'Squid', id: 'squid', action: ACTION.KILL, xp: 10, from: 0, to: 20 },
    {
      type: 'Cooked Porkchop',
      id: 'cooked_porkchop',
      action: ACTION.SMELT,
      xp: 10,
      from: 0,
      to: 20,
    },
    {
      type: 'Cooked Chicken',
      id: 'cooked_chicken',
      action: ACTION.SMELT,
      xp: 10,
      from: 0,
      to: 20,
    },
    { type: 'Cooked Mutton', id: 'cooked_mutton', action: ACTION.SMELT, xp: 10, from: 0, to: 20 },
    { type: 'Steak', id: 'steak', action: ACTION.SMELT, xp: 10, from: 0, to: 20 },
    { type: 'Cow', id: 'cow', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Pig', id: 'pig', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Horse', id: 'horse', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Sheep', id: 'sheep', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Rabbit', id: 'rabbit', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Chicken', id: 'chicken', action: ACTION.KILL, xp: 14, from: 0, to: 20 },
    { type: 'Cooked Fish', id: 'cooked_fish', action: ACTION.SMELT, xp: 15, from: 0, to: 20 },
    { type: 'Cooked Salmon', id: 'cooked_salmon', action: ACTION.SMELT, xp: 15, from: 0, to: 20 },
    { type: 'Raw fish', id: 'raw_fish', action: ACTION.FISH, xp: 25, from: 0, to: 20 },
    { type: 'Raw Salmon', id: 'raw_salmon', action: ACTION.FISH, xp: 35, from: 0, to: 20 },
    { type: 'Creeper', id: 'creeper', action: ACTION.KILL, xp: 40, from: 0, to: 20 },
    { type: 'Pufferfish', id: 'pufferfish', action: ACTION.FISH, xp: 75, from: 0, to: 20 },
    { type: 'Clownfish', id: 'clownfish', action: ACTION.FISH, xp: 200, from: 0, to: 20 },
    { type: 'Wither', id: 'wither', action: ACTION.KILL, xp: 1000, from: 0, to: 20 },
    { type: 'Goat', id: 'goat', action: ACTION.KILL, xp: 20, from: 0, to: 20 },
    { type: 'Carp', id: 'carp', action: ACTION.FISH, xp: 150, from: 2, to: 20 },
    { type: 'Bass', id: 'bass', action: ACTION.FISH, xp: 225, from: 2, to: 20 },
    { type: 'Manta Ray', id: 'manta_ray', action: ACTION.FISH, xp: 300, from: 2, to: 20 },
    { type: 'Snail', id: 'snail', action: ACTION.KILL, xp: 25, from: 2, to: 20 },
    { type: 'Red Tuna', id: 'red_tuna', action: ACTION.FISH, xp: 450, from: 2, to: 20 },
    { type: 'Moonfish', id: 'moonfish', action: ACTION.FISH, xp: 550, from: 2, to: 20 },
    { type: 'Exp Fish', id: 'exp_fish', action: ACTION.FISH, xp: 750, from: 3, to: 20 },
    { type: 'Parrot', id: 'parrot', action: ACTION.KILL, xp: 30, from: 3, to: 20 },
    { type: 'Whale', id: 'whale', action: ACTION.FISH, xp: 10000, from: 4, to: 20 },
    { type: 'Kraken', id: 'kraken', action: ACTION.FISH, xp: 15000, from: 4, to: 20 },
    { type: 'Dolphin', id: 'dolphin', action: ACTION.KILL, xp: 35, from: 5, to: 20 },
    { type: 'Zombie', id: 'zombie', action: ACTION.KILL, xp: 15, from: 7, to: 20 },
    { type: 'Turtle', id: 'turtle', action: ACTION.KILL, xp: 40, from: 8, to: 20 },
    { type: 'Panda', id: 'panda', action: ACTION.KILL, xp: 60, from: 9, to: 20 },
    { type: 'Skeleton', id: 'skeleton', action: ACTION.KILL, xp: 20, from: 11, to: 20 },
    { type: 'Elephant', id: 'elephant', action: ACTION.KILL, xp: Number.NaN, from: 11, to: 20 },
    { type: 'Crab', id: 'crab', action: ACTION.KILL, xp: 80, from: 12, to: 20 },
    { type: 'Spider', id: 'spider', action: ACTION.KILL, xp: 8, from: 13, to: 20 },
    { type: 'Blaze', id: 'blaze', action: ACTION.KILL, xp: 25, from: 14, to: 20 },
    { type: 'Witch', id: 'witch', action: ACTION.KILL, xp: 35, from: 14, to: 20 },
    { type: 'Snake', id: 'snake', action: ACTION.KILL, xp: 120, from: 15, to: 20 },
    { type: 'Cave Spider', id: 'cave_spider', action: ACTION.KILL, xp: 15, from: 18, to: 20 },
    { type: 'Jelly Fish', id: 'jelly_fish', action: ACTION.KILL, xp: 150, from: 18, to: 20 },
  ],
  alchemist: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_alchemist',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 20,
    },
    { type: 'Candy', id: 'candy_alchemist', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 20 },
    { type: 'Empty Flask', id: 'empty_flask', action: ACTION.CRAFT, xp: 0.2, from: 0, to: 20 },
    { type: 'Jacaranda Log', id: 'jacaranda_log', action: ACTION.BREAK, xp: 10, from: 0, to: 20 },
    {
      type: 'Judeecercis Log',
      id: 'judeecercis_log',
      action: ACTION.BREAK,
      xp: 10,
      from: 0,
      to: 20,
    },
    { type: 'Erable Log', id: 'erable_log', action: ACTION.BREAK, xp: 10, from: 0, to: 20 },
    { type: 'Extractor', id: 'extractor', action: ACTION.CRAFT, xp: 20, from: 0, to: 20 },
    {
      type: 'Lightning Potion',
      id: 'lightning_potion',
      action: ACTION.CRAFT,
      xp: 30,
      from: 0,
      to: 20,
    },
    {
      type: 'Jacaranda Log',
      id: 'jacaranda_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 15,
      from: 0,
      to: 20,
    },
    {
      type: 'Blue Orchid',
      id: 'blue_orchid',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 1,
      from: 3,
      to: 20,
    },
    {
      type: 'Dandelion',
      id: 'dandelion',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 1,
      from: 3,
      to: 20,
    },
    { type: 'Poppy', id: 'poppy', action: ACTION.THROW_IN_A_CAULDRON, xp: 1, from: 3, to: 20 },
    {
      type: 'White Tulip',
      id: 'white_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    {
      type: 'Oxeye Daisy',
      id: 'oxeye_daisy',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    {
      type: 'Orange Tulip',
      id: 'orange_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    { type: 'Allium', id: 'allium', action: ACTION.THROW_IN_A_CAULDRON, xp: 2, from: 3, to: 20 },
    {
      type: 'Pink Tulip',
      id: 'pink_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    {
      type: 'Azure Bluet',
      id: 'azure_bluet',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    {
      type: 'Red Tulip',
      id: 'red_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 3,
      to: 20,
    },
    {
      type: 'Judeecercis Log',
      id: 'judeecercis_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 40,
      from: 5,
      to: 20,
    },
    {
      type: 'Green Glueball',
      id: 'green_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 6,
      to: 20,
    },
    {
      type: 'Blue Glueball',
      id: 'blue_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 6,
      to: 20,
    },
    {
      type: 'Red Glueball',
      id: 'red_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 6,
      to: 20,
    },
    {
      type: 'Gray Glueball',
      id: 'gray_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Cyan Glueball',
      id: 'cyan_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Yellow Glueball',
      id: 'yellow_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Purple Glueball',
      id: 'purple_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Green Dark Glueball',
      id: 'green_dark_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Orange Glueball',
      id: 'orange_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Green Flash Glueball',
      id: 'green_flash_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 10,
      to: 20,
    },
    {
      type: 'Paladium Ingot',
      id: 'paladium_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 40,
      from: 10,
      to: 20,
    },
    {
      type: 'Titane Ingot',
      id: 'titane_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 20,
      from: 6,
      to: 20,
    },
    {
      type: 'Amethyst Ingot',
      id: 'amethyst_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 6,
      from: 3,
      to: 20,
    },
    {
      type: 'Erable Log',
      id: 'erable_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 80,
      from: 10,
      to: 20,
    },
    {
      type: 'Paladium Flower',
      id: 'paladium_flower',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 100,
      from: 16,
      to: 20,
    },
  ],
}

const getJobNeededXpForLevel = (level: number) => {
  let sum = 0
  for (let i = 2; i <= level; i++) {
    sum = Math.floor(sum + Math.pow(i, 2.27) * 30.0 + 450 * i)
  }
  return sum
}

const getNextNeededXpForLevel = (level: number) => {
  if (level < 1) {
    return 0
  }

  if (level >= JOB_MAX_LEVEL) {
    return getJobNeededXpForLevel(JOB_MAX_LEVEL) - getJobNeededXpForLevel(JOB_MAX_LEVEL - 1)
  }

  return getJobNeededXpForLevel(level + 1) - getJobNeededXpForLevel(level)
}

const getJobLevel = (experience: number) => {
  let sum = 0
  let level = 0
  while (experience > sum) {
    if (level > JOB_MAX_LEVEL) {
      sum = Math.floor(sum + Math.pow(JOB_MAX_LEVEL, 2.27) * 30.0 + 450 * JOB_MAX_LEVEL)
    } else {
      sum = Math.floor(sum + Math.pow(level, 2.27) * 30.0 + 450 * level)
    }
    level++
  }

  return Math.max(0, level - 2)
}

export {
  jobCategories,
  xpPerItem,
  jobXp,
  rewardsPerJob,
  getJobNeededXpForLevel,
  getNextNeededXpForLevel,
  getJobLevel,
}
