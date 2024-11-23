import { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'

type Faction = InferSchemaType<typeof db.factions.schema>
type Player = InferSchemaType<typeof db.players.schema>

const faction: Faction = {
  uuid: '048bc6a2-84a6-4809-96f5-a06f2320a318',
  date: '2024-01-05',
  newDate: new Date('2024-01-05'),
  name: 'guidebot',
  bgName: 'GuideBot',
  description: 'La faction du bot PalaGuideBot',
  createdAt: 1717818691037,
  players: [
    {
      group: 'leader',
      joinedAt: 1717818691037,
      username: 'PalaGuideBot',
      uuid: 'e7c62d78-f0f6-4122-b194-53782dd0a06f',
    },
    {
      group: 'developer',
      joinedAt: 1717818692036,
      username: 'TonyKun7',
      uuid: 'b38dc660-1e1e-4272-9ed9-d7acfe27c913',
    },
    {
      group: 'developer',
      joinedAt: 1717818693035,
      username: 'Riveur',
      uuid: '93db5a60-1a6d-407f-afc8-b41803efe5fa',
    },
    {
      group: 'graphist',
      joinedAt: 1717818694034,
      username: 'Zeluck_',
      uuid: 'ac25480d-7a05-4964-84f7-fb123375dc39',
    },
    {
      group: 'contributor',
      joinedAt: 1717818691033,
      username: 'volcanofr',
      uuid: '0b1c3f16-b735-457a-b588-b51c4391d630',
    },
  ],
  emblem: [-16777216, 5, -13312, -16777216, 3, -1, -27392, 17],
  alliance: 'ORDER',
  retry: {
    count: 0,
    disabled: false,
  },
}

const player: Player = {
  uuid: 'e7c62d78-f0f6-4122-b194-53782dd0a06f',
  username: 'PalaGuideBot',
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
    currentSkin: 'pet_arty',
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
    name: 'internet',
    damage: 100,
    food: 100,
    sharedXpPercent: 100,
    xp: 100,
    level: 15,
  },
  firstJoin: 1708112953001,
  friends: [
    {
      username: 'TonyKun7',
      uuid: 'b38dc660-1e1e-4272-9ed9-d7acfe27c913',
      rank: 'developpeur',
    },
    {
      username: 'Riveur',
      uuid: '93db5a60-1a6d-407f-afc8-b41803efe5fa',
      rank: 'developpeur',
    },
    {
      username: 'Zeluck_',
      uuid: 'ac25480d-7a05-4964-84f7-fb123375dc39',
      rank: 'graphiste',
    },
  ],
  retry: {
    count: 0,
    disabled: false,
  },
  data: [
    {
      date: '2024-01-05',
      newDate: new Date('2024-01-05'),
      data: {
        faction: 'GuideBot',
        factionRank: 'Leader',
        jobs: {
          alchemist: {
            level: 50,
            xp: 25000,
          },
          farmer: {
            level: 70,
            xp: 10000,
          },
          hunter: {
            level: 60,
            xp: 20000,
          },
          miner: {
            level: 25,
            xp: 5000,
          },
        },
        money: 5000000,
        rank: 'trixium+',
        timePlayed: 5000,
        clicker: {
          rps: 0,
          production: 0,
        },
      },
    },
    {
      date: '2024-01-04',
      newDate: new Date('2024-01-04'),
      data: {
        faction: 'GuideBot',
        factionRank: 'Leader',
        jobs: {
          alchemist: {
            level: 40,
            xp: 20000,
          },
          farmer: {
            level: 65,
            xp: 8000,
          },
          hunter: {
            level: 50,
            xp: 16000,
          },
          miner: {
            level: 20,
            xp: 4000,
          },
        },
        money: 4000000,
        rank: 'trixium',
        timePlayed: 4000,
        clicker: {
          rps: 500,
          production: 50000,
        },
      },
    },
    {
      date: '2024-01-03',
      newDate: new Date('2024-01-03'),
      data: {
        faction: 'GuideBot',
        factionRank: 'Leader',
        jobs: {
          alchemist: {
            level: 30,
            xp: 15000,
          },
          farmer: {
            level: 60,
            xp: 6000,
          },
          hunter: {
            level: 40,
            xp: 12000,
          },
          miner: {
            level: 15,
            xp: 3000,
          },
        },
        money: 3000000,
        rank: 'endium',
        timePlayed: 3000,
        clicker: {
          rps: 1000,
          production: 100000,
        },
      },
    },
    {
      date: '2024-01-02',
      newDate: new Date('2024-01-02'),
      data: {
        faction: 'GuideBot',
        factionRank: 'Leader',
        jobs: {
          alchemist: {
            level: 20,
            xp: 10000,
          },
          farmer: {
            level: 55,
            xp: 4000,
          },
          hunter: {
            level: 30,
            xp: 8000,
          },
          miner: {
            level: 10,
            xp: 2000,
          },
        },
        money: 2000000,
        rank: 'paladin',
        timePlayed: 2000,
        clicker: {
          rps: 1500,
          production: 150000,
        },
      },
    },
    {
      date: '2024-01-01',
      newDate: new Date('2024-01-01'),
      data: {
        faction: 'GuideBot',
        factionRank: 'Leader',
        jobs: {
          alchemist: {
            level: 10,
            xp: 5000,
          },
          farmer: {
            level: 50,
            xp: 2000,
          },
          hunter: {
            level: 20,
            xp: 4000,
          },
          miner: {
            level: 5,
            xp: 1000,
          },
        },
        money: 1000000,
        rank: 'default',
        timePlayed: 1000,
        clicker: {
          rps: 2000,
          production: 200000,
        },
      },
    },
  ],
}

export { faction, player }
