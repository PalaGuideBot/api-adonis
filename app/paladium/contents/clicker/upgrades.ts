const clicks = [
  { name: 'click_1', item: ['nothing'] },
  { name: 'click_2', item: ['nothing'] },
  { name: 'click_3', item: ['nothing'] },
  { name: 'click_4', item: ['nothing'] },
  { name: 'click_5', item: ['nothing'] },
  { name: 'click_6', item: ['nothing'] },
  { name: 'click_7', item: ['nothing'] },
  { name: 'click_8', item: ['nothing'] },
  { name: 'click_9', item: ['nothing'] },
  { name: 'click_10', item: ['nothing'] },
  { name: 'click_11', item: ['nothing'] },
  { name: 'click_12', item: ['nothing'] },
  { name: 'click_13', item: ['nothing'] },
  { name: 'click_14', item: ['nothing'] },
  { name: 'click_15', item: ['nothing'] },
  { name: 'click_16', item: ['nothing'] },
  { name: 'click_17', item: ['nothing'] },
  { name: 'click_18', item: ['nothing'] },
]

const globals = [
  { name: 'global_1', item: ['all'] },
  { name: 'global_2', item: ['all'] },
  { name: 'global_3', item: ['all'] },
  { name: 'global_4', item: ['all'] },
  { name: 'global_5', item: ['all'] },
  { name: 'global_6', item: ['all'] },
  { name: 'global_7', item: ['all'] },
  { name: 'global_8', item: ['all'] },
  { name: 'global_9', item: ['all'] },
  { name: 'global_10', item: ['all'] },
]

const terrains = [
  {
    name: 'terrain_miner',
    item: [
      'abandoned_mine',
      'big_rocks_cave',
      'dwarves_mine',
      'bottomless_pit',
      'autonomous_mine',
      'radioactive_cave',
      'Earth_center',
    ],
  },
  {
    name: 'terrain_farmer',
    item: ['grandma_garden', 'volcanic_island', 'lush_jungle', 'corrupted_lands', 'Eden_garden'],
  },
  {
    name: 'terrain_hunter',
    item: [
      'scorching_dunes',
      'mystical_forest',
      'forgotten_temple',
      'millennial_crypt',
      'kraken_pit',
      'Great_Ancients_Pantheon',
    ],
  },
  {
    name: 'terrain_alchemist',
    item: [
      'witch_cabin',
      'buzzing_hive',
      'snowy_forest',
      'enigmatic_fissure',
      'time_travel_machine',
      'Devil_lair',
    ],
  },
]

const buildings = [
  { name: 'abandoned_mine_1', item: ['abandoned_mine'] },
  { name: 'abandoned_mine_2', item: ['abandoned_mine'] },
  { name: 'big_rocks_cave_1', item: ['big_rocks_cave'] },
  { name: 'big_rocks_cave_2', item: ['big_rocks_cave'] },
  { name: 'dwarves_mine_1', item: ['dwarves_mine'] },
  { name: 'dwarves_mine_2', item: ['dwarves_mine'] },
  { name: 'grandma_garden_1', item: ['grandma_garden'] },
  { name: 'grandma_garden_2', item: ['grandma_garden'] },
  { name: 'witch_cabin_1', item: ['witch_cabin'] },
  { name: 'witch_cabin_2', item: ['witch_cabin'] },
  { name: 'buzzing_hive_1', item: ['buzzing_hive'] },
  { name: 'buzzing_hive_2', item: ['buzzing_hive'] },
  { name: 'snowy_forest_1', item: ['snowy_forest'] },
  { name: 'snowy_forest_2', item: ['snowy_forest'] },
  { name: 'frozen_iceberg_1', item: ['frozen_iceberg'] },
  { name: 'frozen_iceberg_2', item: ['frozen_iceberg'] },
  { name: 'pirate_port_1', item: ['pirate_port'] },
  { name: 'pirate_port_2', item: ['pirate_port'] },
  { name: 'volcanic_island_1', item: ['volcanic_island'] },
  { name: 'volcanic_island_2', item: ['volcanic_island'] },
  { name: 'scorching_dunes_1', item: ['scorching_dunes'] },
  { name: 'scorching_dunes_2', item: ['scorching_dunes'] },
  { name: 'mystical_forest_1', item: ['mystical_forest'] },
  { name: 'mystical_forest_2', item: ['mystical_forest'] },
  { name: 'lush_jungle_1', item: ['lush_jungle'] },
  { name: 'lush_jungle_2', item: ['lush_jungle'] },
  { name: 'forgotten_temple_1', item: ['forgotten_temple'] },
  { name: 'forgotten_temple_2', item: ['forgotten_temple'] },
  { name: 'millennial_crypt_1', item: ['millennial_crypt'] },
  { name: 'millennial_crypt_2', item: ['millennial_crypt'] },
  { name: 'bottomless_pit_1', item: ['bottomless_pit'] },
  { name: 'bottomless_pit_2', item: ['bottomless_pit'] },
]

const many = [
  { name: 'abandoned_mine_many', item: ['abandoned_mine'] },
  { name: 'big_rocks_cave_many', item: ['big_rocks_cave'] },
  { name: 'dwarves_mine_many', item: ['dwarves_mine'] },
  { name: 'grandma_garden_many', item: ['grandma_garden'] },
  { name: 'witch_cabin_many', item: ['witch_cabin'] },
  { name: 'buzzing_hive_many', item: ['buzzing_hive'] },
  { name: 'snowy_forest_many', item: ['snowy_forest'] },
  { name: 'frozen_iceberg_many', item: ['frozen_iceberg'] },
  { name: 'pirate_port_many', item: ['pirate_port'] },
  { name: 'volcanic_island_many', item: ['volcanic_island'] },
  { name: 'scorching_dunes_many', item: ['scorching_dunes'] },
  { name: 'mystical_forest_many', item: ['mystical_forest'] },
  { name: 'lush_jungle_many', item: ['lush_jungle'] },
  { name: 'forgotten_temple_many', item: ['forgotten_temple'] },
  { name: 'millennial_crypt_many', item: ['millennial_crypt'] },
  { name: 'bottomless_pit_many', item: ['bottomless_pit'] },
]

const posteriors = [
  {
    name: 'big_rocks_cave_posterior',
    activeItem: ['big_rocks_cave'],
    previousItem: ['abandoned_mine'],
  },
  {
    name: 'dwarves_mine_posterior',
    activeItem: ['dwarves_mine'],
    previousItem: ['big_rocks_cave'],
  },
  { name: 'witch_cabin_posterior', activeItem: ['witch_cabin'], previousItem: ['grandma_garden'] },
  { name: 'buzzing_hive_posterior', activeItem: ['buzzing_hive'], previousItem: ['witch_cabin'] },
  {
    name: 'frozen_iceberg_posterior',
    activeItem: ['frozen_iceberg'],
    previousItem: ['snowy_forest'],
  },
  {
    name: 'volcanic_island_posterior',
    activeItem: ['volcanic_island'],
    previousItem: ['pirate_port'],
  },
  {
    name: 'scorching_dunes_posterior',
    activeItem: ['scorching_dunes'],
    previousItem: ['volcanic_island'],
  },
  { name: 'lush_jungle_posterior', activeItem: ['lush_jungle'], previousItem: ['mystical_forest'] },
  {
    name: 'forgotten_temple_posterior',
    activeItem: ['forgotten_temple'],
    previousItem: ['lush_jungle'],
  },
  {
    name: 'millennial_crypt_posterior',
    activeItem: ['millennial_crypt'],
    previousItem: ['forgotten_temple'],
  },
  {
    name: 'bottomless_pit_posterior',
    activeItem: ['bottomless_pit'],
    previousItem: ['millennial_crypt'],
  },
]

const categories = [
  {
    name: 'category_miner_1',
    item: [
      'abandoned_mine',
      'big_rocks_cave',
      'dwarves_mine',
      'bottomless_pit',
      'autonomous_mine',
      'radioactive_cave',
      'Earth_center',
    ],
    pourcentage: 0.1,
  },
  {
    name: 'category_farmer_1',
    item: ['grandma_garden', 'volcanic_island', 'lush_jungle', 'corrupted_lands', 'Eden_garden'],
    pourcentage: 0.1,
  },
  {
    name: 'category_hunter_1',
    item: [
      'scorching_dunes',
      'mystical_forest',
      'forgotten_temple',
      'millennial_crypt',
      'kraken_pit',
      'Great_Ancients_Pantheon',
    ],
    pourcentage: 0.1,
  },
  {
    name: 'category_alchemist_1',
    item: [
      'witch_cabin',
      'buzzing_hive',
      'snowy_forest',
      'enigmatic_fissure',
      'time_travel_machine',
      'Devil_lair',
    ],
    pourcentage: 0.1,
  },
  { name: 'category_humanoid', item: ['dwarves_mine', 'pirate_port'], pourcentage: 0.5 },
  { name: 'category_frozen', item: ['snowy_forest', 'frozen_iceberg'], pourcentage: 0.5 },
  { name: 'category_on_water', item: ['frozen_iceberg', 'pirate_port'], pourcentage: 0.5 },
  {
    name: 'category_forest',
    item: ['snowy_forest', 'mystical_forest', 'lush_jungle'],
    pourcentage: 0.5,
  },
]

const upgrades = {
  clicks,
  globals,
  terrains,
  buildings,
  many,
  posteriors,
  categories,
}

export { upgrades as default }
