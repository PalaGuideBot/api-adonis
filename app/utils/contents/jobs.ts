import type { JobReward } from '#utils/types'

const jobCategories = ['miner', 'farmer', 'hunter', 'alchemist'] as const

const jobXp: number[] = [
  480, 1044, 1713, 2497, 3408, 4451, 5635, 6966, 8447, 10086, 11885, 13850, 15983, 18290, 20773,
  23435, 26281, 29312, 32532, 35943, 39549, 43351, 47353, 51556, 55964, 60577, 65399, 70432, 75677,
  81137, 86813, 92709, 98824, 105162, 111724, 118512, 125527, 132772, 140248, 147956, 155898,
  164076, 172492, 181146, 190040, 199176, 208555, 218179, 228049, 238166, 248532, 259148, 270015,
  281135, 292509, 304138, 316023, 328166, 340568, 353230, 366153, 379399, 392788, 406502, 420482,
  434728, 449243, 464027, 479081, 494407, 510004, 525875, 542021, 558442, 575150, 592115, 609368,
  626901, 644714, 662809, 681186, 699846, 718791, 738021, 757537, 777339, 797430, 817810, 838479,
  859439, 880690, 902234, 924071, 946202, 968628, 991349, 1014368, 1037683, 1061297, 1085210,
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
  2: rewardBuilder({ reward: 'paladium', quantity: 2 }),
  3: rewardBuilder({ reward: 'trixium', quantity: 2 }),
  4: rewardBuilder({ reward: 'paladium', quantity: 3 }),
  5: rewardBuilder({ reward: 'trixium', quantity: 3 }, { reward: 'money', quantity: 500 }),
  6: rewardBuilder({ reward: 'paladium', quantity: 3 }),
  7: rewardBuilder({ reward: 'trixium', quantity: 3 }),
  8: rewardBuilder({ reward: 'paladium', quantity: 4 }),
  9: rewardBuilder({ reward: 'trixium', quantity: 4 }),
  10: rewardBuilder(
    { reward: 'paladium', quantity: 3 },
    { reward: 'trixium', quantity: 3 },
    { reward: 'money', quantity: 1000 }
  ),
  11: rewardBuilder({ reward: 'paladium', quantity: 4 }),
  12: rewardBuilder({ reward: 'trixium', quantity: 4 }),
  13: rewardBuilder({ reward: 'paladium', quantity: 5 }),
  14: rewardBuilder({ reward: 'trixium', quantity: 5 }),
  15: rewardBuilder(
    { reward: 'paladium', quantity: 6 },
    { reward: 'trixium', quantity: 6 },
    { reward: 'money', quantity: 1500 }
  ),
  16: rewardBuilder({ reward: 'paladium', quantity: 6 }),
  17: rewardBuilder({ reward: 'trixium', quantity: 6 }),
  18: rewardBuilder({ reward: 'paladium', quantity: 7 }),
  19: rewardBuilder({ reward: 'trixium', quantity: 7 }),
  20: rewardBuilder(
    { reward: 'paladium', quantity: 7 },
    { reward: 'trixium', quantity: 7 },
    { reward: 'money', quantity: 2000 }
  ),
  21: rewardBuilder({ reward: 'paladium', quantity: 6 }),
  22: rewardBuilder({ reward: 'trixium', quantity: 6 }),
  23: rewardBuilder({ reward: 'paladium', quantity: 7 }),
  24: rewardBuilder({ reward: 'trixium', quantity: 7 }),
  25: rewardBuilder(
    { reward: 'paladium', quantity: 7 },
    { reward: 'trixium', quantity: 7 },
    { reward: 'money', quantity: 2000 }
  ),
  26: rewardBuilder({ reward: 'paladium', quantity: 7 }),
  27: rewardBuilder({ reward: 'trixium', quantity: 7 }),
  28: rewardBuilder({ reward: 'paladium', quantity: 8 }),
  29: rewardBuilder({ reward: 'trixium', quantity: 8 }),
  30: rewardBuilder(
    { reward: 'paladium', quantity: 10 },
    { reward: 'trixium', quantity: 10 },
    { reward: 'money', quantity: 3000 }
  ),
  31: rewardBuilder({ reward: 'paladium', quantity: 11 }),
  32: rewardBuilder({ reward: 'trixium', quantity: 11 }),
  33: rewardBuilder({ reward: 'paladium', quantity: 12 }),
  34: rewardBuilder({ reward: 'trixium', quantity: 12 }),
  35: rewardBuilder(
    { reward: 'paladium', quantity: 12 },
    { reward: 'trixium', quantity: 12 },
    { reward: 'money', quantity: 3500 }
  ),
  36: rewardBuilder({ reward: 'paladium', quantity: 12 }),
  37: rewardBuilder({ reward: 'trixium', quantity: 12 }),
  38: rewardBuilder({ reward: 'paladium', quantity: 13 }),
  39: rewardBuilder({ reward: 'trixium', quantity: 13 }),
  40: rewardBuilder(
    { reward: 'paladium', quantity: 15 },
    { reward: 'trixium', quantity: 15 },
    { reward: 'money', quantity: 4000 }
  ),
  41: rewardBuilder({ reward: 'paladium', quantity: 14 }),
  42: rewardBuilder({ reward: 'trixium', quantity: 14 }),
  43: rewardBuilder({ reward: 'paladium', quantity: 15 }),
  44: rewardBuilder({ reward: 'trixium', quantity: 15 }),
  45: rewardBuilder(
    { reward: 'paladium', quantity: 16 },
    { reward: 'trixium', quantity: 16 },
    { reward: 'money', quantity: 4500 }
  ),
  46: rewardBuilder({ reward: 'paladium', quantity: 16 }),
  47: rewardBuilder({ reward: 'trixium', quantity: 16 }),
  48: rewardBuilder({ reward: 'paladium', quantity: 17 }),
  49: rewardBuilder({ reward: 'trixium', quantity: 17 }),
  50: rewardBuilder(
    { reward: 'paladium', quantity: 17 },
    { reward: 'trixium', quantity: 17 },
    { reward: 'money', quantity: 5000 }
  ),
  51: rewardBuilder({ reward: 'paladium', quantity: 17 }),
  52: rewardBuilder({ reward: 'trixium', quantity: 17 }),
  53: rewardBuilder({ reward: 'paladium', quantity: 18 }),
  54: rewardBuilder({ reward: 'trixium', quantity: 18 }),
  55: rewardBuilder(
    { reward: 'paladium', quantity: 20 },
    { reward: 'trixium', quantity: 20 },
    { reward: 'money', quantity: 5500 }
  ),
  56: rewardBuilder({ reward: 'paladium', quantity: 19 }),
  57: rewardBuilder({ reward: 'trixium', quantity: 19 }),
  58: rewardBuilder({ reward: 'paladium', quantity: 20 }),
  59: rewardBuilder({ reward: 'trixium', quantity: 20 }),
  60: rewardBuilder(
    { reward: 'paladium', quantity: 21 },
    { reward: 'trixium', quantity: 21 },
    { reward: 'money', quantity: 6000 }
  ),
  61: rewardBuilder({ reward: 'paladium', quantity: 21 }),
  62: rewardBuilder({ reward: 'trixium', quantity: 21 }),
  63: rewardBuilder({ reward: 'paladium', quantity: 22 }),
  64: rewardBuilder({ reward: 'trixium', quantity: 22 }),
  65: rewardBuilder(
    { reward: 'paladium', quantity: 22 },
    { reward: 'trixium', quantity: 22 },
    { reward: 'money', quantity: 6500 }
  ),
  66: rewardBuilder({ reward: 'paladium', quantity: 21 }),
  67: rewardBuilder({ reward: 'trixium', quantity: 21 }),
  68: rewardBuilder({ reward: 'paladium', quantity: 22 }),
  69: rewardBuilder({ reward: 'trixium', quantity: 22 }),
  70: rewardBuilder(
    { reward: 'paladium', quantity: 22 },
    { reward: 'trixium', quantity: 22 },
    { reward: 'money', quantity: 7000 }
  ),
  71: rewardBuilder({ reward: 'paladium', quantity: 24 }),
  72: rewardBuilder({ reward: 'trixium', quantity: 24 }),
  73: rewardBuilder({ reward: 'paladium', quantity: 25 }),
  74: rewardBuilder({ reward: 'trixium', quantity: 25 }),
  75: rewardBuilder(
    { reward: 'paladium', quantity: 26 },
    { reward: 'trixium', quantity: 26 },
    { reward: 'money', quantity: 7500 }
  ),
  76: rewardBuilder({ reward: 'paladium', quantity: 26 }),
  77: rewardBuilder({ reward: 'trixium', quantity: 26 }),
  78: rewardBuilder({ reward: 'paladium', quantity: 27 }),
  79: rewardBuilder({ reward: 'trixium', quantity: 27 }),
  80: rewardBuilder(
    { reward: 'paladium', quantity: 27 },
    { reward: 'trixium', quantity: 27 },
    { reward: 'money', quantity: 8000 }
  ),
  81: rewardBuilder({ reward: 'paladium', quantity: 27 }),
  82: rewardBuilder({ reward: 'trixium', quantity: 27 }),
  83: rewardBuilder({ reward: 'paladium', quantity: 28 }),
  84: rewardBuilder({ reward: 'trixium', quantity: 28 }),
  85: rewardBuilder(
    { reward: 'paladium', quantity: 30 },
    { reward: 'trixium', quantity: 30 },
    { reward: 'money', quantity: 8500 }
  ),
  86: rewardBuilder({ reward: 'paladium', quantity: 29 }),
  87: rewardBuilder({ reward: 'trixium', quantity: 29 }),
  88: rewardBuilder({ reward: 'paladium', quantity: 30 }),
  89: rewardBuilder({ reward: 'trixium', quantity: 30 }),
  90: rewardBuilder(
    { reward: 'paladium', quantity: 31 },
    { reward: 'trixium', quantity: 31 },
    { reward: 'money', quantity: 9000 }
  ),
  91: rewardBuilder({ reward: 'paladium', quantity: 31 }),
  92: rewardBuilder({ reward: 'trixium', quantity: 31 }),
  93: rewardBuilder({ reward: 'paladium', quantity: 32 }),
  94: rewardBuilder({ reward: 'trixium', quantity: 32 }),
  95: rewardBuilder(
    { reward: 'paladium', quantity: 32 },
    { reward: 'trixium', quantity: 32 },
    { reward: 'money', quantity: 9500 }
  ),
  96: rewardBuilder({ reward: 'paladium', quantity: 32 }),
  97: rewardBuilder({ reward: 'trixium', quantity: 32 }),
  98: rewardBuilder({ reward: 'paladium', quantity: 33 }),
  99: rewardBuilder({ reward: 'trixium', quantity: 33 }),
  100: rewardBuilder(
    { reward: 'paladium', quantity: 34 },
    { reward: 'trixium', quantity: 34 },
    { reward: 'money', quantity: 10000 }
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
      to: 100,
    },
    { type: 'Candy', id: 'candy_miner', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 100 },
    { type: 'Nether brick', id: 'nether_brick', action: ACTION.SMELT, xp: 0.1, from: 0, to: 100 },
    { type: 'Stone', id: 'stone', action: ACTION.BREAK, xp: 0.5, from: 0, to: 100 },
    { type: 'Charcoal', id: 'charcoal', action: ACTION.SMELT, xp: 1, from: 0, to: 100 },
    { type: 'Andesite', id: 'andesite', action: ACTION.BREAK, xp: 3, from: 0, to: 100 },
    { type: 'Granite', id: 'granite', action: ACTION.BREAK, xp: 3, from: 0, to: 100 },
    { type: 'Diorite', id: 'diorite', action: ACTION.BREAK, xp: 3, from: 0, to: 100 },
    { type: 'Coal Ore', id: 'coal_ore', action: ACTION.BREAK, xp: 4, from: 0, to: 100 },
    {
      type: 'Nether Quartz Ore',
      id: 'nether_quartz_ore',
      action: ACTION.BREAK,
      xp: 6,
      from: 0,
      to: 100,
    },
    { type: 'Obsidian', id: 'obsidian', action: ACTION.BREAK, xp: 6, from: 0, to: 100 },
    {
      type: 'Lapis Lazuli Ore',
      id: 'lapis_lazuli_ore',
      action: ACTION.BREAK,
      xp: 15,
      from: 0,
      to: 100,
    },
    { type: 'Redstone Ore', id: 'redstone_ore', action: ACTION.BREAK, xp: 15, from: 0, to: 100 },
    { type: 'Emerald Ore', id: 'emerald_ore', action: ACTION.BREAK, xp: 75, from: 0, to: 100 },
    { type: 'Iron Ore', id: 'iron_ore', action: ACTION.SMELT, xp: 8, from: 10, to: 100 },
    { type: 'Diamond Ore', id: 'diamond_ore', action: ACTION.BREAK, xp: 25, from: 10, to: 100 },
    { type: 'Gold Ore', id: 'gold_ore', action: ACTION.SMELT, xp: 30, from: 15, to: 100 },
    {
      type: 'Amethyst Ore',
      id: 'amethyst_ore',
      action: ACTION.SMELT,
      xp: 35,
      from: 20,
      to: 100,
    },
    {
      type: 'Iron Particle',
      id: 'iron_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 2,
      from: 25,
      to: 100,
    },
    {
      type: 'Gold Particle',
      id: 'gold_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 4,
      from: 25,
      to: 100,
    },
    {
      type: 'Diamond Particle',
      id: 'diamond_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 8,
      from: 25,
      to: 100,
    },
    {
      type: 'Amethyst Particle',
      id: 'amethyst_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 12,
      from: 25,
      to: 100,
    },
    {
      type: 'Titane Particle',
      id: 'titane_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 16,
      from: 25,
      to: 100,
    },
    {
      type: 'Paladium Particle',
      id: 'paladium_particle',
      action: ACTION.OBTAIN_FROM_COBBLEBREAKER,
      xp: 20,
      from: 25,
      to: 100,
    },
    { type: 'Titane Ore', id: 'titane_ore', action: ACTION.SMELT, xp: 50, from: 30, to: 100 },
    {
      type: 'Cavernous Zombie',
      id: 'cavernous_zombie',
      action: ACTION.KILL,
      xp: Number.NaN,
      from: 35,
      to: 100,
    },
    { type: 'Paladium Ore', id: 'paladium_ore', action: ACTION.SMELT, xp: 150, from: 40, to: 100 },
    { type: 'Findium Ore', id: 'findium_ore', action: ACTION.BREAK, xp: 110, from: 50, to: 100 },
    {
      type: 'Green Paladium Ore',
      id: 'green_paladium_ore',
      action: ACTION.SMELT,
      xp: 200,
      from: 60,
      to: 100,
    },
  ],
  farmer: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_farmer',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 100,
    },
    { type: 'Candy', id: 'candy_farmer', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 100 },
    { type: 'Bread', id: 'bread', action: ACTION.CRAFT, xp: 1, from: 0, to: 100 },
    { type: 'Seed', id: 'seed', action: ACTION.BREAK, xp: 1.5, from: 0, to: 100 },
    { type: 'Baked Potato', id: 'baked_potato', action: ACTION.SMELT, xp: 1, from: 5, to: 100 },
    { type: 'Potato', id: 'potato', action: ACTION.BREAK, xp: 2, from: 5, to: 100 },
    { type: 'Carrot', id: 'carrot', action: ACTION.BREAK, xp: 2.5, from: 10, to: 100 },
    { type: 'Melon', id: 'melon', action: ACTION.BREAK, xp: 4, from: 15, to: 100 },
    { type: 'Pumpkin', id: 'pumpkin', action: ACTION.BREAK, xp: 5, from: 30, to: 100 },
    {
      type: 'Farmer Chicken',
      id: 'farmer_chicken',
      action: ACTION.KILL,
      xp: Number.NaN,
      from: 35,
      to: 100,
    },
    {
      type: 'Amethyst Ingot',
      id: 'amethyst_ingot',
      action: ACTION.CRUSH,
      xp: 3,
      from: 40,
      to: 100,
    },
    { type: 'Eggplant', id: 'eggplant', action: ACTION.BREAK, xp: 10, from: 40, to: 100 },
    { type: 'Pumpkin Pie', id: 'pumpkin_pie', action: ACTION.CRAFT, xp: 4, from: 55, to: 100 },
    { type: 'Titane Ingot', id: 'titane_ingot', action: ACTION.CRUSH, xp: 4.5, from: 60, to: 100 },
    { type: 'Chervil', id: 'chervil', action: ACTION.BREAK, xp: 20, from: 60, to: 100 },
    {
      type: 'Paladium Ingot',
      id: 'paladium_ingot',
      action: ACTION.CRUSH,
      xp: 6,
      from: 80,
      to: 100,
    },
    { type: 'Kiwano', id: 'kiwano', action: ACTION.BREAK, xp: 50, from: 80, to: 100 },
  ],
  hunter: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_hunter',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 100,
    },
    { type: 'Candy', id: 'candy_hunter', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 100 },
    { type: 'Snow Golem', id: 'snow_golem', action: ACTION.KILL, xp: 1, from: 0, to: 100 },
    { type: 'Squid', id: 'squid', action: ACTION.KILL, xp: 10, from: 0, to: 100 },
    {
      type: 'Cooked Porkchop',
      id: 'cooked_porkchop',
      action: ACTION.SMELT,
      xp: 10,
      from: 0,
      to: 100,
    },
    {
      type: 'Cooked Chicken',
      id: 'cooked_chicken',
      action: ACTION.SMELT,
      xp: 10,
      from: 0,
      to: 100,
    },
    { type: 'Cooked Mutton', id: 'cooked_mutton', action: ACTION.SMELT, xp: 10, from: 0, to: 100 },
    { type: 'Steak', id: 'steak', action: ACTION.SMELT, xp: 10, from: 0, to: 100 },
    { type: 'Cow', id: 'cow', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Pig', id: 'pig', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Horse', id: 'horse', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Sheep', id: 'sheep', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Rabbit', id: 'rabbit', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Chicken', id: 'chicken', action: ACTION.KILL, xp: 14, from: 0, to: 100 },
    { type: 'Cooked Fish', id: 'cooked_fish', action: ACTION.SMELT, xp: 15, from: 0, to: 100 },
    { type: 'Cooked Salmon', id: 'cooked_salmon', action: ACTION.SMELT, xp: 15, from: 0, to: 100 },
    { type: 'Raw fish', id: 'raw_fish', action: ACTION.FISH, xp: 25, from: 0, to: 100 },
    { type: 'Raw Salmon', id: 'raw_salmon', action: ACTION.FISH, xp: 35, from: 0, to: 100 },
    { type: 'Creeper', id: 'creeper', action: ACTION.KILL, xp: 40, from: 0, to: 100 },
    { type: 'Pufferfish', id: 'pufferfish', action: ACTION.FISH, xp: 75, from: 0, to: 100 },
    { type: 'Clownfish', id: 'clownfish', action: ACTION.FISH, xp: 200, from: 0, to: 100 },
    { type: 'Wither', id: 'wither', action: ACTION.KILL, xp: 1000, from: 0, to: 100 },
    { type: 'Goat', id: 'goat', action: ACTION.KILL, xp: 20, from: 2, to: 100 },
    { type: 'Carp', id: 'carp', action: ACTION.FISH, xp: 150, from: 5, to: 100 },
    { type: 'Bass', id: 'bass', action: ACTION.FISH, xp: 150, from: 5, to: 100 },
    { type: 'Manta Ray', id: 'manta_ray', action: ACTION.FISH, xp: 300, from: 5, to: 100 },
    { type: 'Snail', id: 'snail', action: ACTION.KILL, xp: 25, from: 10, to: 100 },
    { type: 'Red Tuna', id: 'red_tuna', action: ACTION.FISH, xp: 450, from: 10, to: 100 },
    { type: 'Moonfish', id: 'moonfish', action: ACTION.FISH, xp: 550, from: 10, to: 100 },
    { type: 'Exp Fish', id: 'exp_fish', action: ACTION.FISH, xp: 750, from: 15, to: 100 },
    { type: 'Parrot', id: 'parrot', action: ACTION.KILL, xp: 30, from: 16, to: 100 },
    { type: 'Whale', id: 'whale', action: ACTION.FISH, xp: 10000, from: 20, to: 100 },
    { type: 'Kraken', id: 'kraken', action: ACTION.FISH, xp: 15000, from: 20, to: 100 },
    { type: 'Dolphin', id: 'dolphin', action: ACTION.KILL, xp: 35, from: 28, to: 100 },
    { type: 'Zombie', id: 'zombie', action: ACTION.KILL, xp: 15, from: 35, to: 100 },
    { type: 'Turtle', id: 'turtle', action: ACTION.KILL, xp: 40, from: 41, to: 100 },
    { type: 'Panda', id: 'panda', action: ACTION.KILL, xp: 60, from: 48, to: 100 },
    { type: 'Skeleton', id: 'skeleton', action: ACTION.KILL, xp: 20, from: 55, to: 100 },
    { type: 'Elephant', id: 'elephant', action: ACTION.KILL, xp: Number.NaN, from: 56, to: 100 },
    { type: 'Crab', id: 'crab', action: ACTION.KILL, xp: 80, from: 63, to: 100 },
    { type: 'Spider', id: 'spider', action: ACTION.KILL, xp: 8, from: 65, to: 100 },
    { type: 'Blaze', id: 'blaze', action: ACTION.KILL, xp: 25, from: 70, to: 100 },
    { type: 'Witch', id: 'witch', action: ACTION.KILL, xp: 35, from: 70, to: 100 },
    { type: 'Snake', id: 'snake', action: ACTION.KILL, xp: 120, from: 76, to: 100 },
    { type: 'Cave Spider', id: 'cave_spider', action: ACTION.KILL, xp: 15, from: 90, to: 100 },
    { type: 'Jelly Fish', id: 'jelly_fish', action: ACTION.KILL, xp: 150, from: 92, to: 100 },
  ],
  alchemist: [
    {
      type: 'Bottle [+1000]',
      id: 'bottle_alchemist',
      action: ACTION.CONSUMES,
      xp: 1000,
      from: 0,
      to: 100,
    },
    { type: 'Candy', id: 'candy_alchemist', action: ACTION.CONSUMES, xp: 50000, from: 0, to: 100 },
    { type: 'Empty Flask', id: 'empty_flask', action: ACTION.CRAFT, xp: 0.2, from: 0, to: 100 },
    { type: 'Jacaranda Log', id: 'jacaranda_log', action: ACTION.BREAK, xp: 10, from: 0, to: 100 },
    {
      type: 'Judeecercis Log',
      id: 'judeecercis_log',
      action: ACTION.BREAK,
      xp: 10,
      from: 0,
      to: 100,
    },
    { type: 'Erable Log', id: 'erable_log', action: ACTION.BREAK, xp: 10, from: 0, to: 100 },
    { type: 'Extractor', id: 'extractor', action: ACTION.CRAFT, xp: 20, from: 0, to: 100 },
    {
      type: 'Lightning Potion',
      id: 'lightning_potion',
      action: ACTION.CRAFT,
      xp: 30,
      from: 0,
      to: 100,
    },
    {
      type: 'Jacaranda Log',
      id: 'jacaranda_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 15,
      from: 5,
      to: 100,
    },
    {
      type: 'Blue Orchid',
      id: 'blue_orchid',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 1,
      from: 15,
      to: 100,
    },
    {
      type: 'Dandelion',
      id: 'dandelion',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 1,
      from: 15,
      to: 100,
    },
    { type: 'Poppy', id: 'poppy', action: ACTION.THROW_IN_A_CAULDRON, xp: 1, from: 15, to: 100 },
    {
      type: 'White Tulip',
      id: 'white_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    {
      type: 'Oxeye Daisy',
      id: 'oxeye_daisy',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    {
      type: 'Orange Tulip',
      id: 'orange_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    { type: 'Allium', id: 'allium', action: ACTION.THROW_IN_A_CAULDRON, xp: 2, from: 15, to: 100 },
    {
      type: 'Pink Tulip',
      id: 'pink_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    {
      type: 'Azure Bluet',
      id: 'azure_bluet',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    {
      type: 'Red Tulip',
      id: 'red_tulip',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 2,
      from: 15,
      to: 100,
    },
    {
      type: 'Amethyst Ingot',
      id: 'amethyst_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 6,
      from: 15,
      to: 100,
    },
    {
      type: 'Judeecercis Log',
      id: 'judeecercis_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 40,
      from: 25,
      to: 100,
    },
    {
      type: 'Green Glueball',
      id: 'green_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 30,
      to: 100,
    },
    {
      type: 'Blue Glueball',
      id: 'blue_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 30,
      to: 100,
    },
    {
      type: 'Red Glueball',
      id: 'red_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 2,
      from: 30,
      to: 100,
    },
    {
      type: 'Titane Ingot',
      id: 'titane_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 20,
      from: 30,
      to: 100,
    },
    {
      type: 'Flower Monster',
      id: 'flower_monster',
      action: ACTION.KILL,
      xp: Number.NaN,
      from: 35,
      to: 100,
    },
    {
      type: 'Gray Glueball',
      id: 'gray_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Cyan Glueball',
      id: 'cyan_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Yellow Glueball',
      id: 'yellow_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Purple Glueball',
      id: 'purple_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Green Dark Glueball',
      id: 'green_dark_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Orange Glueball',
      id: 'orange_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Green Flash Glueball',
      id: 'green_flash_glueball',
      action: ACTION.CRAFT_IN_A_CAULDRON,
      xp: 15,
      from: 50,
      to: 100,
    },
    {
      type: 'Paladium Ingot',
      id: 'paladium_ingot',
      action: ACTION.CRAFT_IN_PORTAL,
      xp: 40,
      from: 50,
      to: 100,
    },
    {
      type: 'Erable Log',
      id: 'erable_log',
      action: ACTION.EXTRACT_FROM_SAP,
      xp: 80,
      from: 50,
      to: 100,
    },
    {
      type: 'Paladium Flower',
      id: 'paladium_flower',
      action: ACTION.THROW_IN_A_CAULDRON,
      xp: 100,
      from: 80,
      to: 100,
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
