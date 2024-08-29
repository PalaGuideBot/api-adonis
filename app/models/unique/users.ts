import { model, Schema } from 'mongoose'

interface UserLeaderboard {
  boss: number
  money: number
  end: number
  koth: number
  chorus: number
  egghunt: number
  corruption: number
  clicker: number
  trixium: number
  job_alchemist: number
  job_farmer: number
  job_hunter: number
  job_miner: number
}

interface UserAchievements {
  completed: number
  incomplete: number
  total: number
}

interface Retry {
  count?: number
  disabled?: boolean
}

interface UserData {
  date: string
  data: {
    faction: string
    factionRank: string
    jobs: {
      alchemist: {
        level: number
        xp: number
      }
      farmer: {
        level: number
        xp: number
      }
      hunter: {
        level: number
        xp: number
      }
      miner: {
        level: number
        xp: number
      }
    }
    money: number
    rank: string
    timePlayed: number
    clicker: {
      rps: number
      production: number
    }
  }
}

interface Friend {
  uuid: string
  username: string
  rank: string
}

interface Mount {
  mountType: number
  name: string
  damage: number
  food: number
  sharedXpPercent: number
  xp: number
}

interface Pet {
  currentSkin: string
  happiness: number
  skills: {
    id: string
    lastChange: number
    nextUse: number
  }[]
}

interface User {
  uuid: string
  username: string
  leaderboard: UserLeaderboard
  achievements: UserAchievements
  firstJoin: number
  retry: Retry
  mount: Mount
  pet: Pet
  friends: Friend[]
  data: UserData[]
}

const userSchema: Schema = new Schema<User>({
  uuid: { type: String, required: true },
  username: { type: String, required: true },
  leaderboard: {
    boss: Number,
    money: Number,
    end: Number,
    koth: Number,
    chorus: Number,
    egghunt: Number,
    corruption: Number,
    clicker: Number,
    trixium: Number,
    job_alchemist: Number,
    job_farmer: Number,
    job_hunter: Number,
    job_miner: Number,
  },
  achievements: {
    completed: Number,
    incomplete: Number,
    total: Number,
  },
  firstJoin: Number,
  retry: {
    count: Number,
    disabled: Boolean,
  },
  mount: {
    mountType: Number,
    name: String,
    damage: Number,
    food: Number,
    sharedXpPercent: Number,
    xp: Number,
  },
  pet: {
    currentSkin: String,
    happiness: Number,
    skills: [
      {
        id: String,
        lastChange: Number,
        nextUse: Number,
      },
    ],
  },
  friends: [
    {
      uuid: String,
      username: String,
      rank: String,
    },
  ],
  data: [
    {
      date: String,
      data: {
        faction: String,
        factionRank: String,
        jobs: {
          alchemist: {
            level: Number,
            xp: Number,
          },
          farmer: {
            level: Number,
            xp: Number,
          },
          hunter: {
            level: Number,
            xp: Number,
          },
          miner: {
            level: Number,
            xp: Number,
          },
        },
        money: Number,
        rank: String,
        timePlayed: Number,
        clicker: {
          rps: Number,
          production: Number,
        },
      },
    },
  ],
})

const Users = model<User>('MapUsers', userSchema)

export default Users
