const jobCategories = ['miner', 'farmer', 'hunter', 'alchemist'] as const

const jobXp: number[] = [
  480, 1044, 1713, 2497, 3408, 4451, 5635, 6966, 8447, 10086, 11885, 13850, 15983, 18290, 20773,
  23435, 26281, 29312, 32532, 35943, 39549, 43351, 47353, 51556, 55964, 60577, 65399, 70432, 75677,
  81137, 86813, 92709, 98824, 105162, 111724, 118512, 125527, 132772, 140248, 147956, 155898,
  164076, 172492, 181146, 190040, 199176, 208555, 218179, 228049, 238166, 248532, 259148, 270015,
  281135, 292509, 304138, 316023, 328166, 340568, 353230, 366153, 379399, 392788, 406502, 420482,
  434728, 449243, 464027, 479081, 494407, 510004, 525875, 542021, 558442, 575150, 592115, 609368,
  626901, 644714, 662809, 681186, 699846, 718791, 738021, 757537, 777339, 797430, 817810, 838479,
  859438, 880690, 902234, 924071, 946202, 968628, 991349, 1004368, 1037683, 1061297, 1085210,
]

type Reward = {
  label: string
  id: string
} & ({ type: 'item' | 'currency'; quantity: number } | { type: 'craft' | 'usage' | 'command' })

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
  jeton: {
    id: 'jeton',
    label: 'Jeton',
    type: 'currency',
  },
  endium_nugget: {
    id: 'endium_nugget',
    label: 'Endium Nugget',
    type: 'item',
  },
  double_xp_30: {
    id: 'double_xp_30',
    label: 'Double XP 30 minutes',
    type: 'item',
  },
  double_xp_1: {
    id: 'double_xp_1',
    label: 'Double XP 1 hour',
    type: 'item',
  },
  unwrap_candy: {
    id: 'unwrap_candy',
    label: 'Unwrap Candy',
    type: 'item',
  },

  /* Miner */

  voidstone_craft: {
    id: 'voidstone',
    label: 'Voidstone',
    type: 'craft',
  },
  voidstone_usage: {
    id: 'voidstone',
    label: 'Voidstone',
    type: 'usage',
  },
  amethyst_excavator_craft: {
    id: 'amethyst_excavator',
    label: 'Amethyst Excavator',
    type: 'craft',
  },
  amethyst_excavator_usage: {
    id: 'amethyst_excavator',
    label: 'Amethyst Excavator',
    type: 'usage',
  },
  cave_block_craft: {
    id: 'cave_block',
    label: 'Cave Block',
    type: 'craft',
  },
  command_nether_craft: {
    id: 'command_nether',
    label: 'Command /nether',
    type: 'command',
  },
  boom_obsidian_craft: {
    id: 'boom_obsidian',
    label: 'Boom Obsidian',
    type: 'craft',
  },
  big_tnt_craft: {
    id: 'big_tnt',
    label: 'Big TNT',
    type: 'craft',
  },
  amethyst_builder_wand_craft: {
    id: 'amethyst_builder_wand',
    label: 'Amethyst Builder Wand',
    type: 'craft',
  },
  big_obsidian_craft: {
    id: 'big_obsidian',
    label: 'Big Obsidian',
    type: 'craft',
  },
  mega_boom_obsidian_craft: {
    id: 'mega_boom_obsidian',
    label: 'Mega Boom Obsidian',
    type: 'craft',
  },
  effect_tnt_craft: {
    id: 'effect_tnt',
    label: 'Effect TNT',
    type: 'craft',
  },
  paladium_pickaxe: {
    id: 'paladium_pickaxe',
    label: 'Paladium Pickaxe (Efficiency 5, Unbreaking 3, Fortune 3)',
    type: 'item',
  },
  cobblebreaker_craft: {
    id: 'cobblebreaker',
    label: 'CobbleBreaker',
    type: 'craft',
  },
  cobblebreaker_usage: {
    id: 'cobblebreaker',
    label: 'CobbleBreaker',
    type: 'usage',
  },
  spike_obsidian_wood_craft: {
    id: 'spike_obsidian_wood',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  spike_obsidian_iron_craft: {
    id: 'spike_obsidian_iron',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  spike_obsidian_gold_craft: {
    id: 'spike_obsidian_gold',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  voidstone_minage_craft: {
    id: 'voidstone_minage',
    label: 'Voidstone Minage',
    type: 'craft',
  },
  voidstone_minage_usage: {
    id: 'voidstone_minage',
    label: 'Voidstone Minage',
    type: 'usage',
  },
  spike_obsidian_diamond_craft: {
    id: 'spike_obsidian_diamond',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  spike_obsidian_amethyst_craft: {
    id: 'spike_obsidian_amethyst',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  spike_obsidian_titane_craft: {
    id: 'spike_obsidian_titane',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  spike_obsidian_paladium_craft: {
    id: 'spike_obsidian_paladium',
    label: 'Spike Obsidian',
    type: 'craft',
  },
  magnet_craft: {
    id: 'magnet',
    label: 'Magnet',
    type: 'craft',
  },
  magnet_usage: {
    id: 'magnet',
    label: 'Magnet',
    type: 'usage',
  },
  knockback_obsidian_craft: {
    id: 'knockback_obsidian',
    label: 'Knockback Obsidian',
    type: 'craft',
  },
  dollars_stone_craft: {
    id: 'dollars_stone',
    label: 'Dollars Stone',
    type: 'craft',
  },
  dollars_stone_usage: {
    id: 'dollars_stone',
    label: 'Dollars Stone',
    type: 'usage',
  },
  lava_obsidian_craft: {
    id: 'lava_obsidian',
    label: 'Lava Obsidian',
    type: 'craft',
  },
  paladium_hopper_craft: {
    id: 'paladium_hopper',
    label: 'Paladium Hopper',
    type: 'craft',
  },
  paladium_hopper_usage: {
    id: 'paladium_hopper',
    label: 'Paladium Hopper',
    type: 'usage',
  },
  amethyst_cobblebreaker_upgrade_craft: {
    id: 'amethyst_cobblebreaker_upgrade',
    label: 'Amethyst CobbleBreaker Upgrade',
    type: 'craft',
  },
  amethyst_cobblebreaker_upgrade_usage: {
    id: 'amethyst_cobblebreaker_upgrade',
    label: 'Amethyst CobbleBreaker Upgrade',
    type: 'usage',
  },
  frozen_obsidian_craft: {
    id: 'frozen_obsidian',
    label: 'Frozen Obsidian',
    type: 'craft',
  },
  sulfuric_obsidian_craft: {
    id: 'sulfuric_obsidian',
    label: 'Sulfuric Obsidian',
    type: 'craft',
  },
  slime_obsidian_craft: {
    id: 'slime_obsidian',
    label: 'Slime Obsidian',
    type: 'craft',
  },
  titane_excavator_craft: {
    id: 'titane_excavator',
    label: 'Titane Excavator',
    type: 'craft',
  },
  titane_excavator_usage: {
    id: 'titane_excavator',
    label: 'Titane Excavator',
    type: 'usage',
  },
  wither_tnt_craft: {
    id: 'wither_tnt',
    label: 'Wither TNT',
    type: 'craft',
  },
  sealed_xp_bottle_craft: {
    id: 'sealed_xp_bottle',
    label: 'Sealed XP Bottle',
    type: 'craft',
  },
  enchanted_experience_bottle_craft: {
    id: 'enchanted_experience_bottle',
    label: 'Enchanted Experience Bottle',
    type: 'craft',
  },
  titane_builder_wand_craft: {
    id: 'titane_builder_wand',
    label: 'Titane Builder Wand',
    type: 'craft',
  },
  titane_cobblebreaker_upgrade_craft: {
    id: 'titane_cobblebreaker_upgrade',
    label: 'Titane CobbleBreaker Upgrade',
    type: 'craft',
  },
  titane_cobblebreaker_upgrade_usage: {
    id: 'titane_cobblebreaker_upgrade',
    label: 'Titane CobbleBreaker Upgrade',
    type: 'usage',
  },
  palaforge_craft: {
    id: 'palaforge',
    label: 'Palaforge',
    type: 'craft',
  },
  palaforge_usage: {
    id: 'palaforge',
    label: 'Palaforge',
    type: 'usage',
  },
  poison_obsidian_craft: {
    id: 'poison_obsidian',
    label: 'Poison Obsidian',
    type: 'craft',
  },
  autocrafter_craft: {
    id: 'autocrafter',
    label: 'Autocrafter',
    type: 'craft',
  },
  paladium_excavator_craft: {
    id: 'paladium_excavator',
    label: 'Paladium Excavator',
    type: 'craft',
  },
  paladium_excavator_usage: {
    id: 'paladium_excavator',
    label: 'Paladium Excavator',
    type: 'usage',
  },
  paladium_cobblebreaker_upgrade_craft: {
    id: 'paladium_cobblebreaker_upgrade',
    label: 'Paladium CobbleBreaker Upgrade',
    type: 'craft',
  },
  paladium_cobblebreaker_upgrade_usage: {
    id: 'paladium_cobblebreaker_upgrade',
    label: 'Paladium CobbleBreaker Upgrade',
    type: 'usage',
  },
  wither_obsidian_craft: {
    id: 'wither_obsidian',
    label: 'Wither Obsidian',
    type: 'craft',
  },
  hardness_potion_usage: {
    id: 'hardness_potion',
    label: 'Hardness Potion',
    type: 'usage',
  },
  sponge_tnt_craft: {
    id: 'sponge_tnt',
    label: 'Sponge TNT',
    type: 'craft',
  },
  paladium_builder_wand_craft: {
    id: 'paladium_builder_wand',
    label: 'Paladium Builder Wand',
    type: 'craft',
  },
  anti_aggro_obsidian_craft: {
    id: 'anti_aggro_obsidian',
    label: 'Anti Aggro Obsidian',
    type: 'craft',
  },
  speed_upgrade_craft: {
    id: 'speed_upgrade',
    label: 'Speed Upgrade',
    type: 'craft',
  },
  speed_upgrade_usage: {
    id: 'speed_upgrade',
    label: 'Speed Upgrade',
    type: 'usage',
  },
  withered_reinforced_piston_craft: {
    id: 'withered_reinforced_piston',
    label: 'Withered Reinforced Piston',
    type: 'craft',
  },
  miner_throne_craft: {
    id: 'miner_throne',
    label: 'Miner Throne',
    type: 'craft',
  },
  miner_throne_usage: {
    id: 'miner_throne',
    label: 'Miner Throne',
    type: 'usage',
  },
  endium_tnt_craft: {
    id: 'endium_tnt',
    label: 'Endium TNT',
    type: 'craft',
  },
  endium_tnt_usage: {
    id: 'endium_tnt',
    label: 'Endium TNT',
    type: 'usage',
  },
  endium_builder_wand_craft: {
    id: 'endium_builder_wand',
    label: 'Endium Builder Wand',
    type: 'craft',
  },
  endium_builder_wand_usage: {
    id: 'endium_builder_wand',
    label: 'Endium Builder Wand',
    type: 'usage',
  },
  endium_pickaxe_craft: {
    id: 'endium_pickaxe',
    label: 'Endium Pickaxe',
    type: 'craft',
  },
  endium_pickaxe_usage: {
    id: 'endium_pickaxe',
    label: 'Endium Pickaxe',
    type: 'usage',
  },
  withered_obsidian_craft: {
    id: 'withered_obsidian',
    label: 'Withered Obsidian',
    type: 'craft',
  },
  withered_obsidian_usage: {
    id: 'withered_obsidian',
    label: 'Withered Obsidian',
    type: 'usage',
  },
} satisfies Record<string, Pick<Reward, 'label' | 'id' | 'type'>>

type MultipleBuilderOptions = { reward: keyof typeof rewards; quantity?: number }[]

function rewardBuilder(...options: MultipleBuilderOptions) {
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

const globalJobRewards = {
  1: [],
  2: rewardBuilder(
    { reward: 'paladium', quantity: 1 },
    { reward: 'trixium', quantity: 2 },
    { reward: 'jeton', quantity: 1 }
  ),
  3: rewardBuilder({ reward: 'paladium', quantity: 1 }, { reward: 'trixium', quantity: 3 }),
  4: rewardBuilder({ reward: 'paladium', quantity: 2 }, { reward: 'trixium', quantity: 4 }),
  5: rewardBuilder(
    { reward: 'paladium', quantity: 2 },
    { reward: 'trixium', quantity: 5 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 5000 }
  ),
  6: rewardBuilder({ reward: 'paladium', quantity: 3 }, { reward: 'trixium', quantity: 6 }),
  7: rewardBuilder({ reward: 'paladium', quantity: 3 }, { reward: 'trixium', quantity: 7 }),
  8: rewardBuilder({ reward: 'paladium', quantity: 4 }, { reward: 'trixium', quantity: 8 }),
  9: rewardBuilder({ reward: 'paladium', quantity: 4 }, { reward: 'trixium', quantity: 9 }),
  10: rewardBuilder(
    { reward: 'paladium', quantity: 5 },
    { reward: 'trixium', quantity: 10 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 5000 }
  ),
  11: rewardBuilder({ reward: 'paladium', quantity: 5 }, { reward: 'trixium', quantity: 11 }),
  12: rewardBuilder({ reward: 'paladium', quantity: 6 }, { reward: 'trixium', quantity: 12 }),
  13: rewardBuilder({ reward: 'paladium', quantity: 6 }, { reward: 'trixium', quantity: 13 }),
  14: rewardBuilder({ reward: 'paladium', quantity: 7 }, { reward: 'trixium', quantity: 14 }),
  15: rewardBuilder(
    { reward: 'paladium', quantity: 7 },
    { reward: 'trixium', quantity: 15 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 6000 }
  ),
  16: rewardBuilder({ reward: 'paladium', quantity: 8 }, { reward: 'trixium', quantity: 16 }),
  17: rewardBuilder({ reward: 'paladium', quantity: 8 }, { reward: 'trixium', quantity: 17 }),
  18: rewardBuilder({ reward: 'paladium', quantity: 9 }, { reward: 'trixium', quantity: 18 }),
  19: rewardBuilder({ reward: 'paladium', quantity: 9 }, { reward: 'trixium', quantity: 19 }),
  20: rewardBuilder(
    { reward: 'paladium', quantity: 10 },
    { reward: 'trixium', quantity: 20 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 6000 }
  ),
  21: rewardBuilder({ reward: 'paladium', quantity: 10 }, { reward: 'trixium', quantity: 21 }),
  22: rewardBuilder({ reward: 'paladium', quantity: 11 }, { reward: 'trixium', quantity: 22 }),
  23: rewardBuilder({ reward: 'paladium', quantity: 11 }, { reward: 'trixium', quantity: 23 }),
  24: rewardBuilder({ reward: 'paladium', quantity: 12 }, { reward: 'trixium', quantity: 24 }),
  25: rewardBuilder(
    { reward: 'paladium', quantity: 12 },
    { reward: 'trixium', quantity: 25 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 7500 }
  ),
  26: rewardBuilder({ reward: 'paladium', quantity: 13 }, { reward: 'trixium', quantity: 26 }),
  27: rewardBuilder({ reward: 'paladium', quantity: 13 }, { reward: 'trixium', quantity: 27 }),
  28: rewardBuilder({ reward: 'paladium', quantity: 14 }, { reward: 'trixium', quantity: 28 }),
  29: rewardBuilder({ reward: 'paladium', quantity: 14 }, { reward: 'trixium', quantity: 29 }),
  30: rewardBuilder(
    { reward: 'paladium', quantity: 15 },
    { reward: 'trixium', quantity: 30 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 7500 }
  ),
  31: rewardBuilder({ reward: 'paladium', quantity: 15 }, { reward: 'trixium', quantity: 31 }),
  32: rewardBuilder({ reward: 'paladium', quantity: 16 }, { reward: 'trixium', quantity: 32 }),
  33: rewardBuilder({ reward: 'paladium', quantity: 16 }, { reward: 'trixium', quantity: 33 }),
  34: rewardBuilder({ reward: 'paladium', quantity: 17 }, { reward: 'trixium', quantity: 34 }),
  35: rewardBuilder(
    { reward: 'paladium', quantity: 17 },
    { reward: 'trixium', quantity: 35 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 9500 }
  ),
  36: rewardBuilder({ reward: 'paladium', quantity: 18 }, { reward: 'trixium', quantity: 36 }),
  37: rewardBuilder({ reward: 'paladium', quantity: 18 }, { reward: 'trixium', quantity: 37 }),
  38: rewardBuilder({ reward: 'paladium', quantity: 19 }, { reward: 'trixium', quantity: 38 }),
  39: rewardBuilder({ reward: 'paladium', quantity: 19 }, { reward: 'trixium', quantity: 39 }),
  40: rewardBuilder(
    { reward: 'paladium', quantity: 20 },
    { reward: 'trixium', quantity: 40 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 9500 }
  ),
  41: rewardBuilder({ reward: 'paladium', quantity: 20 }, { reward: 'trixium', quantity: 41 }),
  42: rewardBuilder({ reward: 'paladium', quantity: 21 }, { reward: 'trixium', quantity: 42 }),
  43: rewardBuilder({ reward: 'paladium', quantity: 21 }, { reward: 'trixium', quantity: 43 }),
  44: rewardBuilder({ reward: 'paladium', quantity: 22 }, { reward: 'trixium', quantity: 44 }),
  45: rewardBuilder(
    { reward: 'paladium', quantity: 22 },
    { reward: 'trixium', quantity: 45 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 12000 }
  ),
  46: rewardBuilder({ reward: 'paladium', quantity: 23 }, { reward: 'trixium', quantity: 46 }),
  47: rewardBuilder({ reward: 'paladium', quantity: 23 }, { reward: 'trixium', quantity: 47 }),
  48: rewardBuilder({ reward: 'paladium', quantity: 24 }, { reward: 'trixium', quantity: 48 }),
  49: rewardBuilder({ reward: 'paladium', quantity: 24 }, { reward: 'trixium', quantity: 49 }),
  50: rewardBuilder(
    { reward: 'paladium', quantity: 25 },
    { reward: 'trixium', quantity: 50 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 12000 }
  ),
  51: rewardBuilder({ reward: 'paladium', quantity: 25 }, { reward: 'trixium', quantity: 51 }),
  52: rewardBuilder({ reward: 'paladium', quantity: 26 }, { reward: 'trixium', quantity: 52 }),
  53: rewardBuilder({ reward: 'paladium', quantity: 26 }, { reward: 'trixium', quantity: 53 }),
  54: rewardBuilder({ reward: 'paladium', quantity: 27 }, { reward: 'trixium', quantity: 54 }),
  55: rewardBuilder(
    { reward: 'paladium', quantity: 27 },
    { reward: 'trixium', quantity: 55 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 15000 },
    { reward: 'double_xp_30', quantity: 1 }
  ),
  56: rewardBuilder({ reward: 'paladium', quantity: 28 }, { reward: 'trixium', quantity: 56 }),
  57: rewardBuilder({ reward: 'paladium', quantity: 28 }, { reward: 'trixium', quantity: 57 }),
  58: rewardBuilder({ reward: 'paladium', quantity: 29 }, { reward: 'trixium', quantity: 58 }),
  59: rewardBuilder({ reward: 'paladium', quantity: 29 }, { reward: 'trixium', quantity: 59 }),
  60: rewardBuilder(
    { reward: 'paladium', quantity: 30 },
    { reward: 'trixium', quantity: 60 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 15000 }
  ),
  61: rewardBuilder({ reward: 'paladium', quantity: 30 }, { reward: 'trixium', quantity: 61 }),
  62: rewardBuilder({ reward: 'paladium', quantity: 31 }, { reward: 'trixium', quantity: 62 }),
  63: rewardBuilder({ reward: 'paladium', quantity: 31 }, { reward: 'trixium', quantity: 63 }),
  64: rewardBuilder({ reward: 'paladium', quantity: 32 }, { reward: 'trixium', quantity: 64 }),
  65: rewardBuilder(
    { reward: 'paladium', quantity: 32 },
    { reward: 'trixium', quantity: 65 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 15000 }
  ),
  66: rewardBuilder({ reward: 'paladium', quantity: 33 }, { reward: 'trixium', quantity: 66 }),
  67: rewardBuilder({ reward: 'paladium', quantity: 33 }, { reward: 'trixium', quantity: 67 }),
  68: rewardBuilder({ reward: 'paladium', quantity: 34 }, { reward: 'trixium', quantity: 68 }),
  69: rewardBuilder({ reward: 'paladium', quantity: 34 }, { reward: 'trixium', quantity: 69 }),
  70: rewardBuilder(
    { reward: 'paladium', quantity: 35 },
    { reward: 'trixium', quantity: 70 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 15000 }
  ),
  71: rewardBuilder({ reward: 'paladium', quantity: 35 }, { reward: 'trixium', quantity: 71 }),
  72: rewardBuilder(
    { reward: 'paladium', quantity: 36 },
    { reward: 'trixium', quantity: 72 },
    { reward: 'jeton', quantity: 1 }
  ),
  73: rewardBuilder({ reward: 'paladium', quantity: 36 }, { reward: 'trixium', quantity: 73 }),
  74: rewardBuilder({ reward: 'paladium', quantity: 37 }, { reward: 'trixium', quantity: 74 }),
  75: rewardBuilder(
    { reward: 'paladium', quantity: 37 },
    { reward: 'trixium', quantity: 75 },
    { reward: 'jeton', quantity: 1 }
  ),
  76: rewardBuilder(
    { reward: 'paladium', quantity: 38 },
    { reward: 'trixium', quantity: 76 },
    { reward: 'money', quantity: 17500 }
  ),
  77: rewardBuilder(
    { reward: 'paladium', quantity: 38 },
    { reward: 'trixium', quantity: 77 },
    { reward: 'jeton', quantity: 1 }
  ),
  78: rewardBuilder({ reward: 'paladium', quantity: 39 }, { reward: 'trixium', quantity: 78 }),
  79: rewardBuilder({ reward: 'paladium', quantity: 39 }, { reward: 'trixium', quantity: 79 }),
  80: rewardBuilder(
    { reward: 'paladium', quantity: 40 },
    { reward: 'trixium', quantity: 80 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 17500 }
  ),
  81: rewardBuilder({ reward: 'paladium', quantity: 40 }, { reward: 'trixium', quantity: 81 }),
  82: rewardBuilder(
    { reward: 'paladium', quantity: 41 },
    { reward: 'trixium', quantity: 82 },
    { reward: 'jeton', quantity: 1 }
  ),
  83: rewardBuilder({ reward: 'paladium', quantity: 41 }, { reward: 'trixium', quantity: 83 }),
  84: rewardBuilder({ reward: 'paladium', quantity: 42 }, { reward: 'trixium', quantity: 84 }),
  85: rewardBuilder(
    { reward: 'paladium', quantity: 42 },
    { reward: 'trixium', quantity: 85 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 20000 }
  ),
  86: rewardBuilder({ reward: 'paladium', quantity: 43 }, { reward: 'trixium', quantity: 86 }),
  87: rewardBuilder(
    { reward: 'paladium', quantity: 43 },
    { reward: 'trixium', quantity: 87 },
    { reward: 'jeton', quantity: 1 }
  ),
  88: rewardBuilder({ reward: 'paladium', quantity: 44 }, { reward: 'trixium', quantity: 88 }),
  89: rewardBuilder({ reward: 'paladium', quantity: 44 }, { reward: 'trixium', quantity: 89 }),
  90: rewardBuilder(
    { reward: 'paladium', quantity: 45 },
    { reward: 'trixium', quantity: 90 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 20000 },
    { reward: 'unwrap_candy', quantity: 1 }
  ),
  91: rewardBuilder({ reward: 'paladium', quantity: 45 }, { reward: 'trixium', quantity: 91 }),
  92: rewardBuilder({ reward: 'paladium', quantity: 46 }, { reward: 'trixium', quantity: 92 }),
  93: rewardBuilder({ reward: 'paladium', quantity: 46 }, { reward: 'trixium', quantity: 93 }),
  94: rewardBuilder({ reward: 'paladium', quantity: 47 }, { reward: 'trixium', quantity: 94 }),
  95: rewardBuilder(
    { reward: 'paladium', quantity: 47 },
    { reward: 'trixium', quantity: 95 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 25000 }
  ),
  96: rewardBuilder(
    { reward: 'paladium', quantity: 48 },
    { reward: 'trixium', quantity: 96 },
    { reward: 'jeton', quantity: 1 }
  ),
  97: rewardBuilder(
    { reward: 'paladium', quantity: 48 },
    { reward: 'trixium', quantity: 97 },
    { reward: 'jeton', quantity: 1 }
  ),
  98: rewardBuilder(
    { reward: 'paladium', quantity: 49 },
    { reward: 'trixium', quantity: 98 },
    { reward: 'jeton', quantity: 1 }
  ),
  99: rewardBuilder(
    { reward: 'paladium', quantity: 49 },
    { reward: 'trixium', quantity: 99 },
    { reward: 'jeton', quantity: 1 }
  ),
  100: rewardBuilder(
    { reward: 'paladium', quantity: 50 },
    { reward: 'trixium', quantity: 100 },
    { reward: 'jeton', quantity: 1 },
    { reward: 'money', quantity: 50000 },
    { reward: 'double_xp_1', quantity: 1 },
    { reward: 'endium_nugget', quantity: 1 }
  ),
}

const rewardsPerJob = {
  miner: {
    ...globalJobRewards,
    3: globalJobRewards[3].concat(
      rewardBuilder({ reward: 'voidstone_craft' }, { reward: 'voidstone_usage' })
    ),
    5: globalJobRewards[5].concat(
      rewardBuilder({ reward: 'amethyst_excavator_craft' }, { reward: 'amethyst_excavator_craft' })
    ),
    10: globalJobRewards[10].concat(rewardBuilder({ reward: 'cave_block_craft' })),
    12: globalJobRewards[12].concat(rewardBuilder({ reward: 'command_nether_craft' })),
    15: globalJobRewards[15].concat(rewardBuilder({ reward: 'boom_obsidian_craft' })),
    18: globalJobRewards[18].concat(rewardBuilder({ reward: 'big_tnt_craft' })),
    20: globalJobRewards[20].concat(rewardBuilder({ reward: 'amethyst_builder_wand_craft' })),
    22: globalJobRewards[22].concat(rewardBuilder({ reward: 'big_obsidian_craft' })),
    23: globalJobRewards[23].concat(rewardBuilder({ reward: 'mega_boom_obsidian_craft' })),
    25: globalJobRewards[25].concat(
      rewardBuilder(
        { reward: 'paladium_pickaxe', quantity: 1 },
        { reward: 'effect_tnt_craft' },
        { reward: 'cobblebreaker_craft' },
        { reward: 'cobblebreaker_usage' }
      )
    ),
    27: globalJobRewards[27].concat(rewardBuilder({ reward: 'spike_obsidian_wood_craft' })),
    28: globalJobRewards[28].concat(rewardBuilder({ reward: 'spike_obsidian_iron_craft' })),
    29: globalJobRewards[29].concat(rewardBuilder({ reward: 'spike_obsidian_gold_craft' })),
    30: globalJobRewards[30].concat(rewardBuilder({ reward: 'voidstone_minage_craft' })),
    31: globalJobRewards[31].concat(rewardBuilder({ reward: 'spike_obsidian_diamond_craft' })),
    32: globalJobRewards[32].concat(rewardBuilder({ reward: 'spike_obsidian_amethyst_craft' })),
    33: globalJobRewards[33].concat(rewardBuilder({ reward: 'spike_obsidian_titane_craft' })),
    34: globalJobRewards[34].concat(rewardBuilder({ reward: 'spike_obsidian_paladium_craft' })),
    35: globalJobRewards[35].concat(
      rewardBuilder({ reward: 'magnet_craft' }, { reward: 'magnet_usage' })
    ),
    36: globalJobRewards[36].concat(rewardBuilder({ reward: 'knockback_obsidian_craft' })),
    37: globalJobRewards[37].concat(
      rewardBuilder({ reward: 'dollars_stone_craft' }, { reward: 'dollars_stone_usage' })
    ),
    39: globalJobRewards[39].concat(rewardBuilder({ reward: 'lava_obsidian_craft' })),
    40: globalJobRewards[40].concat(
      rewardBuilder(
        { reward: 'paladium_hopper_craft' },
        { reward: 'paladium_hopper_usage' },
        { reward: 'amethyst_cobblebreaker_upgrade_craft' },
        { reward: 'amethyst_cobblebreaker_upgrade_usage' }
      )
    ),
    41: globalJobRewards[41].concat(rewardBuilder({ reward: 'frozen_obsidian_craft' })),
    42: globalJobRewards[42].concat(rewardBuilder({ reward: 'sulfuric_obsidian_craft' })),
    44: globalJobRewards[44].concat(rewardBuilder({ reward: 'slime_obsidian_craft' })),
    45: globalJobRewards[45].concat(
      rewardBuilder({ reward: 'titane_excavator_craft' }, { reward: 'titane_excavator_usage' })
    ),
    48: globalJobRewards[48].concat(rewardBuilder({ reward: 'wither_tnt_craft' })),
    50: globalJobRewards[50].concat(
      rewardBuilder(
        { reward: 'sealed_xp_bottle_craft' },
        { reward: 'enchanted_experience_bottle_craft' }
      )
    ),
    52: globalJobRewards[52].concat(rewardBuilder({ reward: 'titane_builder_wand_craft' })),
    55: globalJobRewards[55].concat(
      rewardBuilder(
        { reward: 'titane_cobblebreaker_upgrade_craft' },
        { reward: 'titane_cobblebreaker_upgrade_usage' }
      )
    ),
    56: globalJobRewards[56].concat(
      rewardBuilder({ reward: 'palaforge_craft' }, { reward: 'palaforge_usage' })
    ),
    60: globalJobRewards[60].concat(rewardBuilder({ reward: 'poison_obsidian_craft' })),
    65: globalJobRewards[65].concat(rewardBuilder({ reward: 'autocrafter_craft' })),
    67: globalJobRewards[67].concat(
      rewardBuilder({ reward: 'paladium_excavator_craft' }, { reward: 'paladium_excavator_usage' })
    ),
    70: globalJobRewards[70].concat(
      rewardBuilder(
        { reward: 'paladium_cobblebreaker_upgrade_craft' },
        { reward: 'paladium_cobblebreaker_upgrade_usage' }
      )
    ),
    72: globalJobRewards[72].concat(rewardBuilder({ reward: 'wither_obsidian_craft' })),
    73: globalJobRewards[73].concat(rewardBuilder({ reward: 'hardness_potion_usage' })),
    74: globalJobRewards[74].concat(rewardBuilder({ reward: 'sponge_tnt_craft' })),
    76: globalJobRewards[76].concat(rewardBuilder({ reward: 'paladium_builder_wand_craft' })),
    80: globalJobRewards[80].concat(rewardBuilder({ reward: 'anti_aggro_obsidian_craft' })),
    85: globalJobRewards[85].concat(
      rewardBuilder({ reward: 'speed_upgrade_craft' }, { reward: 'speed_upgrade_usage' })
    ),
    90: globalJobRewards[90].concat(rewardBuilder({ reward: 'withered_reinforced_piston_craft' })),
    95: globalJobRewards[95].concat(rewardBuilder({ reward: 'miner_throne_craft' })),
    100: globalJobRewards[100].concat(
      rewardBuilder(
        { reward: 'endium_tnt_craft' },
        { reward: 'endium_tnt_usage' },
        { reward: 'endium_builder_wand_craft' },
        { reward: 'endium_builder_wand_usage' },
        { reward: 'endium_pickaxe_craft' },
        { reward: 'endium_pickaxe_usage' },
        { reward: 'withered_obsidian_craft' },
        { reward: 'withered_obsidian_usage' }
      )
    ),
  },
  farmer: globalJobRewards,
  hunter: globalJobRewards,
  alchemist: globalJobRewards,
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
    { type: 'Kiwano', id: 'kiwano', action: ACTION.BREAK, xp: 200, from: 80, to: 100 },
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

export { jobCategories, xpPerItem, jobXp, rewardsPerJob }
