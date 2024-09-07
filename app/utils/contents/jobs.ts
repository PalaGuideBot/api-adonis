const jobCategories = ['miner', 'farmer', 'hunter', 'alchemist'] as const

const jobXp: number[] = [
  480, 1044, 1713, 2497, 3408, 4451, 5635, 6966, 8447, 10086, 11885, 13850, 15983, 18290, 20773,
  23435, 26281, 29312, 32532, 35943, 39549, 43351, 47353, 51556, 55964, 60577, 65399, 70432, 75677,
  81137, 86813, 92709, 98824, 105162, 111724, 118512, 125527, 132772, 140248, 147956, 155898,
  164076, 172492, 181146, 190040, 199176, 208555, 218179, 228049, 238166, 248532, 259148, 270015,
  281135, 292509, 304138, 316023, 328166, 340568, 353230, 366153, 379399, 392788, 406502, 420482,
  434728, 449243, 464027, 479081, 494407, 510004, 525875, 542021, 558442, 575150, 592115, 609368,
  626901, 644714, 662809, 681186, 699846, 718791, 738021, 757537, 777339, 797430, 817810, 838479,
  859438, 880690, 902234, 924071, 946202, 968628, 991349, 1014368, 1037683, 1061297, 1085210,
]

interface XpPerItem {
  [key: string]: {
    type: string
    xp: number
    action: string
    from: number
  }[]
}

const ACTION_SMELT: string = 'Smelt'
const ACTION_BREAK: string = 'Break'
const ACTION_OBTAIN_FROM_COBBLEBREAKER: string = 'Obtain from CobbleBreaker'
const ACTION_KILL: string = 'Kill'
const ACTION_FISH: string = 'Fish'
const ACTION_CRAFT: string = 'Craft'
const ACTION_EXTRACT_FROM_SAP: string = 'Extract from Sap'
const ACTION_THROW_IN_A_CAULDRON: string = 'Throw in a Cauldron'
const ACTION_CRAFT_IN_PORTAL: string = 'Craft in Portal'
const ACTION_CRAFT_IN_A_CAULDRON: string = 'Craft in a Cauldron'
const ACTION_CRUSH: string = 'Crush'
const ACTION_CONSUMES: string = 'Consumes'

const xpPerItem: XpPerItem = {
  miner: [
    { type: 'Bottle [+1000]', action: ACTION_CONSUMES, xp: 1000, from: -1 },
    { type: 'Candy', action: ACTION_CONSUMES, xp: 50000, from: -1 },
    { type: 'Nether brick', action: ACTION_SMELT, xp: 0.1, from: -1 },
    { type: 'Stone', action: ACTION_BREAK, xp: 0.5, from: -1 },
    { type: 'Charcoal', action: ACTION_SMELT, xp: 1, from: -1 },
    { type: 'Andesite', action: ACTION_BREAK, xp: 3, from: -1 },
    { type: 'Granite', action: ACTION_BREAK, xp: 3, from: -1 },
    { type: 'Diorite', action: ACTION_BREAK, xp: 3, from: -1 },
    { type: 'Coal Ore', action: ACTION_BREAK, xp: 4, from: -1 },
    { type: 'Nether Quartz Ore', action: ACTION_BREAK, xp: 6, from: -1 },
    { type: 'Obsidian', action: ACTION_BREAK, xp: 6, from: -1 },
    { type: 'Lapis Lazulli Ore', action: ACTION_BREAK, xp: 15, from: -1 },
    { type: 'Redstone Ore', action: ACTION_BREAK, xp: 15, from: -1 },
    { type: 'Emerald Ore', action: ACTION_BREAK, xp: 75, from: -1 },
    { type: 'Iron Ingot', action: ACTION_SMELT, xp: 8, from: 10 },
    { type: 'Diamond Ore', action: ACTION_BREAK, xp: 25, from: 10 },
    { type: 'Gold Ingot', action: ACTION_SMELT, xp: 30, from: 15 },
    { type: 'Amethyst Ingot', action: ACTION_SMELT, xp: 35, from: 20 },
    { type: 'Iron Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 2, from: 25 },
    { type: 'Gold Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 4, from: 25 },
    { type: 'Diamond Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 8, from: 25 },
    { type: 'Amethyst Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 12, from: 25 },
    { type: 'Titane Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 16, from: 25 },
    { type: 'Paladium Particle', action: ACTION_OBTAIN_FROM_COBBLEBREAKER, xp: 20, from: 25 },
    { type: 'Titane Ingot', action: ACTION_SMELT, xp: 50, from: 30 },
    { type: 'Cavernous Zombie', action: ACTION_KILL, xp: Number.NaN, from: 35 },
    { type: 'Paladium Ingot', action: ACTION_SMELT, xp: 150, from: 40 },
    { type: 'Findium Ore', action: ACTION_BREAK, xp: 110, from: 50 },
    { type: 'Paladium Green Ingot', action: ACTION_SMELT, xp: 200, from: 60 },
  ],
  farmer: [
    { type: 'Bottle [+1000]', action: ACTION_CONSUMES, xp: 1000, from: -1 },
    { type: 'Candy', action: ACTION_CONSUMES, xp: 50000, from: -1 },
    { type: 'Bread', action: ACTION_CRAFT, xp: 1, from: -1 },
    { type: 'Seed', action: ACTION_BREAK, xp: 1.5, from: -1 },
    { type: 'Baked Potato', action: ACTION_SMELT, xp: 1, from: -1 },
    { type: 'Potatoes', action: ACTION_BREAK, xp: 2, from: -1 },
    { type: 'Carrots', action: ACTION_BREAK, xp: 2.5, from: 10 },
    { type: 'Melon', action: ACTION_BREAK, xp: 4, from: 15 },
    { type: 'Pumpkin', action: ACTION_BREAK, xp: 5, from: 30 },
    { type: 'Farmer Chicken', action: ACTION_KILL, xp: Number.NaN, from: 35 },
    { type: 'Amethyst Ingot', action: ACTION_CRUSH, xp: 3, from: 40 },
    { type: 'Eggplant', action: ACTION_BREAK, xp: 10, from: 40 },
    { type: 'Pumpkin Pie', action: ACTION_CRAFT, xp: 4, from: 55 },
    { type: 'Titane Ingot', action: ACTION_CRUSH, xp: 4.5, from: 60 },
    { type: 'Chervil', action: ACTION_BREAK, xp: 20, from: 60 },
    { type: 'Paladium Ingot', action: ACTION_CRUSH, xp: 6, from: 80 },
    { type: 'Kiwano', action: ACTION_BREAK, xp: 200, from: 80 },
  ],
  hunter: [
    { type: 'Bottle [+1000]', action: ACTION_CONSUMES, xp: 1000, from: -1 },
    { type: 'Candy', action: ACTION_CONSUMES, xp: 50000, from: -1 },
    { type: 'Snow Golem', action: ACTION_KILL, xp: 1, from: -1 },
    { type: 'Squid', action: ACTION_KILL, xp: 10, from: -1 },
    { type: 'Cooked Porkchop', action: ACTION_SMELT, xp: 10, from: -1 },
    { type: 'Cooked Chicken', action: ACTION_SMELT, xp: 10, from: -1 },
    { type: 'Cooked Mutton', action: ACTION_SMELT, xp: 10, from: -1 },
    { type: 'Steak', action: ACTION_SMELT, xp: 10, from: -1 },
    { type: 'Cow', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Pig', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Horse', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Sheep', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Rabbit', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Chicken', action: ACTION_KILL, xp: 14, from: -1 },
    { type: 'Cooked Fish', action: ACTION_SMELT, xp: 15, from: -1 },
    { type: 'Cooked Salmon', action: ACTION_SMELT, xp: 15, from: -1 },
    { type: 'Raw fish', action: ACTION_FISH, xp: 25, from: -1 },
    { type: 'Raw Salmon', action: ACTION_FISH, xp: 35, from: -1 },
    { type: 'Creeper', action: ACTION_KILL, xp: 40, from: -1 },
    { type: 'Pufferfish', action: ACTION_FISH, xp: 75, from: -1 },
    { type: 'Clownfish', action: ACTION_FISH, xp: 200, from: -1 },
    { type: 'Wither', action: ACTION_KILL, xp: 1000, from: -1 },
    { type: 'Goat', action: ACTION_KILL, xp: 20, from: -1 },
    { type: 'Carp', action: ACTION_FISH, xp: 150, from: -1 },
    { type: 'Bass', action: ACTION_FISH, xp: 150, from: -1 },
    { type: 'Manta Ray', action: ACTION_FISH, xp: 300, from: -1 },
    { type: 'Snail', action: ACTION_KILL, xp: 25, from: 10 },
    { type: 'Red Tuna', action: ACTION_FISH, xp: 450, from: 10 },
    { type: 'Moonfish', action: ACTION_FISH, xp: 550, from: 10 },
    { type: 'Exp Fish', action: ACTION_FISH, xp: 750, from: 15 },
    { type: 'Parrot', action: ACTION_KILL, xp: 30, from: 16 },
    { type: 'Whale', action: ACTION_FISH, xp: 10000, from: 20 },
    { type: 'Kraken', action: ACTION_FISH, xp: 15000, from: 20 },
    { type: 'Dolphin', action: ACTION_KILL, xp: 35, from: 28 },
    { type: 'Mega Creeper', action: ACTION_KILL, xp: Number.NaN, from: 35 },
    { type: 'Zombie', action: ACTION_KILL, xp: 15, from: 35 },
    { type: 'Turtle', action: ACTION_KILL, xp: 40, from: 41 },
    { type: 'Panda', action: ACTION_KILL, xp: 60, from: 48 },
    { type: 'Skeleton', action: ACTION_KILL, xp: 20, from: 55 },
    { type: 'Elephant', action: ACTION_KILL, xp: Number.NaN, from: 56 },
    { type: 'Crab', action: ACTION_KILL, xp: 80, from: 63 },
    { type: 'Spider', action: ACTION_KILL, xp: 8, from: 65 },
    { type: 'Blaze', action: ACTION_KILL, xp: 25, from: 70 },
    { type: 'Witch', action: ACTION_KILL, xp: 35, from: 70 },
    { type: 'Snake', action: ACTION_KILL, xp: 120, from: 76 },
    { type: 'Cave Spider', action: ACTION_KILL, xp: 15, from: 90 },
    { type: 'Jelly Fish', action: ACTION_KILL, xp: 150, from: 92 },
  ],
  alchemist: [
    { type: 'Bottle [+1000]', action: ACTION_CONSUMES, xp: 1000, from: -1 },
    { type: 'Candy', action: ACTION_CONSUMES, xp: 50000, from: -1 },
    { type: 'Empty Flask', action: ACTION_CRAFT, xp: 0.2, from: -1 },
    { type: 'Jacaranda Log', action: ACTION_BREAK, xp: 10, from: -1 },
    { type: 'Judeecercis Log', action: ACTION_BREAK, xp: 10, from: -1 },
    { type: 'Erable Log', action: ACTION_BREAK, xp: 10, from: -1 },
    { type: 'Extractor', action: ACTION_CRAFT, xp: 20, from: -1 },
    { type: 'Lightning Potion', action: ACTION_CRAFT, xp: 30, from: -1 },
    { type: 'Jacaranda Log', action: ACTION_EXTRACT_FROM_SAP, xp: 15, from: -1 },
    { type: 'Blue Orchid', action: ACTION_THROW_IN_A_CAULDRON, xp: 1, from: 15 },
    { type: 'Dandelion', action: ACTION_THROW_IN_A_CAULDRON, xp: 1, from: 15 },
    { type: 'Poppy', action: ACTION_THROW_IN_A_CAULDRON, xp: 1, from: 15 },
    { type: 'White Tulip', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Oxeye Daisy', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Orange Tulip', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Allium', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Pink Tulip', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Azure Bluet', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Red Tulip', action: ACTION_THROW_IN_A_CAULDRON, xp: 2, from: 15 },
    { type: 'Amethyst Ingot', action: ACTION_CRAFT_IN_PORTAL, xp: 6, from: 15 },
    { type: 'Judeecercis Log', action: ACTION_EXTRACT_FROM_SAP, xp: 40, from: 25 },
    { type: 'Green Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 2, from: 30 },
    { type: 'Blue Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 2, from: 30 },
    { type: 'Red Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 2, from: 30 },
    { type: 'Titane Ingot', action: ACTION_CRAFT_IN_PORTAL, xp: 20, from: 30 },
    { type: 'Flower Monster', action: ACTION_KILL, xp: Number.NaN, from: 35 },
    { type: 'Gray Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Cyan Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Yellow Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Purple Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Green Dark Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Orange Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Green Flash Glueball', action: ACTION_CRAFT_IN_A_CAULDRON, xp: 15, from: 50 },
    { type: 'Paladium Ingot', action: ACTION_CRAFT_IN_PORTAL, xp: 40, from: 50 },
    { type: 'Erable Log', action: ACTION_EXTRACT_FROM_SAP, xp: 80, from: 50 },
    { type: 'Paladium Flower', action: ACTION_THROW_IN_A_CAULDRON, xp: 100, from: 80 },
  ],
}

export { jobCategories, xpPerItem, jobXp }
