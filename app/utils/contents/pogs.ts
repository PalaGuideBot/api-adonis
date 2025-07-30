import type { Item } from '#utils/types'

function getToolTier(level: number) {
  return pogTiers.find((tier) => tier.levels.includes(level))
}

const SUMMER_RUSH_XP_PER_ITEM = 1 * (300 / 100)

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
    tier: 0,
    levels: [1, 2, 3, 4, 5],
  },
  {
    tier: 1,
    levels: [6, 7, 8, 9, 10],
  },
  {
    tier: 2,
    levels: [11, 12, 13, 14, 15],
  },
  {
    tier: 3,
    levels: [16, 17, 18, 19, 20],
  },
  {
    tier: 4,
    levels: [21, 22, 23, 24, 25],
  },
  {
    tier: 5,
    levels: [26, 27, 28, 29, 30],
  },
  {
    tier: 6,
    levels: [31, 32, 33, 34, 35],
  },
  {
    tier: 7,
    levels: [36, 37, 38, 39, 40],
  },
  {
    tier: 8,
    levels: [41, 42, 43, 44, 45],
  },
  {
    tier: 9,
    levels: [46, 47, 48, 49, 50],
  },
  {
    tier: 10,
    levels: [51, 52, 53, 54, 55],
  },
  {
    tier: 11,
    levels: [56, 57, 58, 59, 60],
  },
  {
    tier: 12,
    levels: [61, 62, 63, 64, 65],
  },
  {
    tier: 13,
    levels: [66, 67, 68, 69, 70],
  },
  {
    tier: 14,
    levels: [71, 72, 73, 74, 75],
  },
  {
    tier: 15,
    levels: [76, 77, 78, 79, 80],
  },
  {
    tier: 16,
    levels: [81, 82, 83, 84, 85],
  },
  {
    tier: 17,
    levels: [86, 87, 88, 89, 90],
  },
  {
    tier: 18,
    levels: [91, 92, 93, 94, 95],
  },
  {
    tier: 19,
    levels: [96, 97, 98, 99, 100],
  },
]

const items: Item[] = [
  {
    name: 'Snow',
    id: 'snow-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 11,
      with_mixed: 6,
      with_green: 11,
      with_pet_skill: (_) => 6,
      with_pet_skill_and_mixed: (_, __) => 6,
    },
  },
  {
    name: 'Leaves',
    id: 'leaves-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 11,
      with_mixed: 6,
      with_green: 11,
      with_pet_skill: (_) => 6,
      with_pet_skill_and_mixed: (_, __) => 6,
    },
  },
  {
    name: 'Netherrack',
    id: 'netherrack-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 21,
      with_mixed: 16,
      with_green: 21,
      with_pet_skill: (_) => 16,
      with_pet_skill_and_mixed: (_, __) => 16,
    },
  },
  {
    name: 'Cactus',
    id: 'cactus-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 21,
      with_mixed: 16,
      with_green: 21,
      with_pet_skill: (_) => 16,
      with_pet_skill_and_mixed: (_, __) => 16,
    },
  },
  {
    name: 'Dirt',
    id: 'dirt-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Sand',
    id: 'sand-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Red Sand',
    id: 'sand-1',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Soul Sand',
    id: 'soul_sand-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Gravel',
    id: 'gravel-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Ice',
    id: 'ice-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 26,
      with_mixed: 21,
      with_green: 26,
      with_pet_skill: (_) => 21,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Wool',
    id: 'wool-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 31,
      with_mixed: 26,
      with_green: 31,
      with_pet_skill: (_) => 26,
      with_pet_skill_and_mixed: (_, __) => 21,
    },
  },
  {
    name: 'Sandstone',
    id: 'sandstone-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 41,
      with_mixed: 31,
      with_green: 36,
      with_pet_skill: (_) => 31,
      with_pet_skill_and_mixed: (_, __) => 33,
    },
  },
  {
    name: 'Hardened Clay',
    id: 'hardened_clay-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 51,
      with_mixed: 41,
      with_green: 46,
      with_pet_skill: (_) => 41,
      with_pet_skill_and_mixed: (_, __) => 43,
    },
  },
  {
    name: 'Stone',
    id: 'stone-0',
    xp: SUMMER_RUSH_XP_PER_ITEM,
    from: {
      default: 56,
      with_mixed: 46,
      with_green: 51,
      with_pet_skill: (_) => 46,
      with_pet_skill_and_mixed: (_, __) => 41,
    },
  },
]

export { items, pogXp, getToolTier }
