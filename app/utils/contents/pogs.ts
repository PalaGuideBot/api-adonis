import type { Item } from '#utils/types'

function calculateItemInstantMine(item: Item) {
  return item.durability * 30
}

function calculateToolDamage(options: {
  toolSpeed: number
  enchantementBonus: number
  hasteMultiplier: number
  petSkillMultiplier: number
}) {
  const { toolSpeed, enchantementBonus, hasteMultiplier, petSkillMultiplier } = options
  let damage = toolSpeed + enchantementBonus

  if (hasteMultiplier > 1) {
    damage *= hasteMultiplier
  }

  if (petSkillMultiplier > 1) {
    damage *= petSkillMultiplier
  }

  return damage
}

function isItemInstantMine(item: Item, toolDamage: number) {
  return toolDamage >= calculateItemInstantMine(item)
}

function calculateEfficiencyBonus(level: number) {
  return Math.pow(level, 2) + 1
}

function getToolTier(level: number) {
  return pogTiers.find((tier) => tier.levels.includes(level))
}

const pogXp: number[] = [
  0, 52, 208, 404, 625, 866, 1125, 1398, 1683, 1981, 2289, 2607, 2935, 3270, 3615, 3967, 4326, 4692,
  5065, 5445, 5831, 6222, 6620, 7023, 7431, 7845, 8264, 8688, 9116, 9550, 9988, 10430, 10876, 11328,
  11783, 12242, 12706, 13173, 13644, 14119, 14597, 15080, 15565, 16055, 16548, 17044, 17544, 18046,
  18553, 19062, 19575, 20090, 20609, 21131, 21655, 22184, 22714, 23247, 23784, 24322, 24865, 25049,
  25957, 26507, 27059, 27615, 28172, 28733, 29296, 29862, 30429, 31000, 31573, 32148, 32726, 33305,
  33888, 34473, 35060, 35648, 36241, 36834, 37430, 38028, 38629, 39231, 39836, 40442, 41052, 41662,
  42275, 42891, 43507, 44127, 44748, 45371, 45996, 46624, 47252, 47883,
]

const pogTiers = [
  {
    levels: [1, 2, 3, 4, 5],
    toolSpeed: 2,
    enchantementBonus: 0,
  },
  {
    levels: [6, 7, 8, 9, 10],
    toolSpeed: 4,
    enchantementBonus: 0,
  },
  {
    levels: [11, 12, 13, 14, 15],
    toolSpeed: 6,
    enchantementBonus: 0,
  },
  {
    levels: [16, 17, 18, 19, 20],
    toolSpeed: 8,
    enchantementBonus: 0,
  },
  {
    levels: [21, 22, 23, 24, 25],
    toolSpeed: 12,
    enchantementBonus: 0,
  },
  {
    levels: [26, 27, 28, 29, 30],
    toolSpeed: 15,
    enchantementBonus: 0,
  },
  {
    levels: [31, 32, 33, 34, 35],
    toolSpeed: 24,
    enchantementBonus: 0,
  },
  {
    levels: [36, 37, 38, 39, 40],
    toolSpeed: 24,
    enchantementBonus: 0,
  },
  {
    levels: [41, 42, 43, 44, 45],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(1),
  },
  {
    levels: [46, 47, 48, 49, 50],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(2),
  },
  {
    levels: [51, 52, 53, 54, 55],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(3),
  },
  {
    levels: [56, 57, 58, 59, 60],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(4),
  },
  {
    levels: [61, 62, 63, 64, 65],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [66, 67, 68, 69, 70],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [71, 72, 73, 74, 75],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [76, 77, 78, 79, 80],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [81, 82, 83, 84, 85],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [86, 87, 88, 89, 90],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [91, 92, 93, 94, 95],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
  {
    levels: [96, 97, 98, 99, 100],
    toolSpeed: 28,
    enchantementBonus: calculateEfficiencyBonus(5),
  },
]

const items: Item[] = [
  {
    name: 'Snow',
    id: 'snow',
    durability: 0.2,
    xp: 1,
  },
  {
    name: 'Leaves',
    id: 'leaves',
    durability: 0.2,
    xp: 1,
  },
  {
    name: 'Netherrack',
    id: 'netherrack',
    durability: 0.4,
    xp: 1,
  },
  {
    name: 'Cactus',
    id: 'cactus',
    durability: 0.4,
    xp: 1,
  },
  {
    name: 'Dirt',
    id: 'dirt',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Sand',
    id: 'sand',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Red Sand',
    id: 'red_sand',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Soul Sand',
    id: 'soul_sand',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Gravel',
    id: 'gravel',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Ice',
    id: 'ice',
    durability: 0.5,
    xp: 1,
  },
  {
    name: 'Wool',
    id: 'wool',
    durability: 0.8,
    xp: 1,
  },
  {
    name: 'Sandstone',
    id: 'sandstone',
    durability: 1,
    xp: 1,
  },
  {
    name: 'Hardened Clay',
    id: 'hardened_clay',
    durability: 1.25,
    xp: 1,
  },
  {
    name: 'Stone',
    id: 'stone',
    durability: 1.5,
    xp: 1,
  },
]

export { items, pogXp, calculateToolDamage, isItemInstantMine, getToolTier }
