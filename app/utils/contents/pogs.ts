const pogCategories = ['with_os', 'without_os']

const pogXp: number[] = [
  0, 52, 208, 404, 625, 866, 1125, 1398, 1683, 1981, 2289, 2607, 2935, 3270, 3615, 3967, 4326, 4692,
  5065, 5445, 5831, 6222, 6620, 7023, 7431, 7845, 8264, 8688, 9116, 9550, 9988, 10430, 10876, 11328,
  11783, 12242, 12706, 13173, 13644, 14119, 14597, 15080, 15565, 16055, 16548, 17044, 17544, 18046,
  18553, 19062, 19575, 20090, 20609, 21131, 21655, 22184, 22714, 23247, 23784, 24322, 24865, 25049,
  25957, 26507, 27059, 27615, 28172, 28733, 29296, 29862, 30429, 31000, 31573, 32148, 32726, 33305,
  33888, 34473, 35060, 35648, 36241, 36834, 37430, 38028, 38629, 39231, 39836, 40442, 41052, 41662,
  42275, 42891, 43507, 44127, 44748, 45371, 45996, 46624, 47252, 47883,
]

type PogItem = {
  name: string
  xp: number
  from: number
}

const xpPerItem: { with_os: PogItem[]; without_os: PogItem[] } = {
  without_os: [
    { name: 'Nothing', xp: 1, from: 0 },
    { name: 'Tree leaves', xp: 1, from: 11 },
    { name: 'Netherrack', xp: 1, from: 21 },
    { name: 'Stone', xp: 1, from: 56 },
  ],
  with_os: [
    { name: 'Nothing', xp: 1, from: 0 },
    { name: 'Tree leaves', xp: 1, from: 6 },
    { name: 'Netherrack', xp: 1, from: 16 },
    { name: 'Stone', xp: 1, from: 36 },
  ],
}

export { pogCategories, pogXp, xpPerItem }
