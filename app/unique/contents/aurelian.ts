import { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import { playerMarketValidator } from '#paladium/validators/player'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

type Player = InferSchemaType<typeof db.players.schema>

const player: Player = {
  uuid: '06c2151d-f855-45d0-b637-ddf574896e24',
  username: 'aureliancnx',
  leaderboard: {
    boss: 404,
    money: 404,
    end: 404,
    koth: 404,
    chorus: 404,
    egghunt: 404,
    corruption: 404,
    clicker: 404,
    job_alchemist: 404,
    job_farmer: 404,
    job_hunter: 404,
    job_miner: 404,
    trixium: 404,
  },
  achievements: {
    completed: 404,
    incomplete: 404,
    total: 808,
  },
  pet: {
    currentSkin: 'Tu cherche quelque chose ?',
    happiness: 100,
    level: 2,
    experience: 100,
    skills: [
      {
        id: 'vital_point',
        lastChange: 1717818691037,
        nextUse: 1717818691037,
      },
    ],
  },
  mount: {
    mountType: 1,
    name: "Non c'est pas un bug",
    damage: 100,
    food: 100,
    sharedXpPercent: 100,
    xp: 100,
    level: 69,
  },
  firstSeen: 1626428738000,
  friends: [],
  retry: {
    count: 0,
    disabled: false,
  },
  data: [
    {
      date: '2025-07-23',
      newDate: new Date('2025-07-23'),
      data: {
        faction: '',
        factionRank: '',
        jobs: {
          alchemist: {
            level: 25,
            xp: 230725,
          },
          farmer: {
            level: 7,
            xp: 230725,
          },
          hunter: {
            level: 20,
            xp: 230725,
          },
          miner: {
            level: 23,
            xp: 230725,
          },
        },
        money: 0,
        rank: '',
        timePlayed: 127353600,
        clicker: {
          rps: 0,
          production: 0,
        },
      },
    },
  ],
}

const market: Infer<typeof playerMarketValidator> = {
  data: [
    {
      category: 'TOOLS',
      createdAt: DateTime.now().toMillis(),
      durability: 100,
      expireAt: DateTime.now().plus({ days: 3 }).toMillis(),
      item: {
        meta: 0,
        name: 'unclaimfinder-bleu',
        quantity: 66,
      },
      name: 'Anti DDOS',
      price: 100000,
      pricePb: 0,
      renamed: true,
      skin: 0,
      slot: 1,
      type: 'PICKAXE',
    },
    {
      category: 'TOOLS',
      createdAt: DateTime.now().toMillis(),
      durability: 100,
      expireAt: DateTime.now().plus({ days: 3 }).toMillis(),
      item: {
        meta: 0,
        name: 'skull-cursed-king',
        quantity: 1,
      },
      name: 'Compte Admin',
      price: 1574200,
      pricePb: 44177,
      renamed: true,
      skin: 0,
      slot: 1,
      type: 'PICKAXE',
    },
    {
      category: 'TOOLS',
      createdAt: DateTime.now().toMillis(),
      durability: 100,
      expireAt: DateTime.now().plus({ days: 3 }).toMillis(),
      item: {
        meta: 0,
        name: 'box-key',
        quantity: 300,
      },
      name: 'API Key Unlimited',
      price: 15489,
      pricePb: 258941,
      renamed: true,
      skin: 0,
      slot: 1,
      type: 'PICKAXE',
    },
  ],
  totalCount: 3,
}

export const aurelian = { player, market }
