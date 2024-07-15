import { db } from '#core/services/db'
import cache from '#cache/cache'

// Define interfaces for status data
interface FactionStatus {
  from: string
  to: string
  status: string
}

interface GlobalStatus extends FactionStatus {
  players: number
  playersCount: number
}

interface JavaData {
  global: {
    status: GlobalStatus[]
    players: number
    playersCount: number
  }
  factions: {
    [key: string]: FactionStatus[]
  }
}

interface LauncherData {
  status: FactionStatus[]
}

interface DailyData {
  date: string
  data: {
    java: JavaData
    launcher: LauncherData
  }
}

interface StatusEntry {
  date: string
  data: {
    java: {
      global: {
        status: string
        players: number
      }
      factions: {
        [key: string]: string
      }
    }
    launcher: {
      status: string
    }
  }
}

const mergeStatuses = (statuses: FactionStatus[]) => {
  return statuses.reduce((merged: FactionStatus[], status: FactionStatus) => {
    const last = merged[merged.length - 1]
    if (last && last.status === status.status) {
      last.to = status.to
    } else {
      merged.push({ ...status })
    }
    return merged
  }, [])
}

const formatStatusEntry = (
  entry: StatusEntry,
  nextEntry: StatusEntry | undefined,
  isToday: boolean
) => {
  const [date, time] = entry.date.split(' ')
  const nextDateTime = nextEntry ? nextEntry.date.split(' ') : null
  const nextDate = nextDateTime ? nextDateTime[0] : null
  const nextTime = nextDateTime ? nextDateTime[1] : isToday ? time : '23:50:00'
  return { date, time, nextDate, nextTime }
}

const initializeDailyData = (date: string) => ({
  date,
  data: {
    java: {
      global: { status: [], players: 0, playersCount: 0 },
      factions: {
        Soleratl: [],
        Muzdan: [],
        Manashino: [],
        Event: [],
        Luccento: [],
        Imbali: [],
        Keltis: [],
        Neolith: [],
        Untaa: [],
      },
    },
    launcher: { status: [] },
  },
})

const processStatusData = (status: StatusEntry[], isToday: boolean) => {
  const result = status.reduce(
    (
      acc: { [key: string]: DailyData },
      entry: StatusEntry,
      index: number,
      array: StatusEntry[]
    ) => {
      const { date, time, nextDate, nextTime } = formatStatusEntry(entry, array[index + 1], isToday)

      if (!acc[date]) {
        acc[date] = initializeDailyData(date)
      }

      const currentDateData = acc[date].data
      const endTime = nextDate && nextDate === date ? nextTime : isToday ? nextTime : '23:59:59'

      currentDateData.java.global.status.push({
        from: time,
        to: endTime,
        status: entry.data.java.global.status,
        players: entry.data.java.global.players,
        playersCount: 1,
      })
      currentDateData.launcher.status.push({
        from: time,
        to: endTime,
        status: entry.data.launcher.status,
      })

      currentDateData.java.global.players += entry.data.java.global.players
      currentDateData.java.global.playersCount += 1

      for (const faction in currentDateData.java.factions) {
        if (entry.data.java.factions[faction]) {
          currentDateData.java.factions[faction].push({
            from: time,
            to: endTime,
            status: entry.data.java.factions[faction],
          })
        }
      }

      return acc
    },
    {}
  )

  for (const date in result) {
    const globalData = result[date].data.java.global
    globalData.status = mergeStatuses(globalData.status).reverse() as GlobalStatus[]
    globalData.players =
      globalData.playersCount > 0 ? globalData.players / globalData.playersCount : 0

    for (const faction in result[date].data.java.factions) {
      result[date].data.java.factions[faction] = mergeStatuses(
        result[date].data.java.factions[faction]
      ).reverse()
    }

    result[date].data.launcher.status = mergeStatuses(result[date].data.launcher.status).reverse()
  }

  return Object.keys(result)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((date) => result[date])
}

async function statusFormaterLast(status: StatusEntry[]) {
  return processStatusData(status, false)
}

async function statusFormaterToday(status: StatusEntry[]) {
  const today = new Date()
    .toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .split('/')
    .reverse()
    .join('-')
  return processStatusData(
    status.filter((entry) => entry.date.split(' ')[0] === today),
    true
  )
}

/*

async function deleteOldStatusFromDB() {
  const currentDate = new Date();
  const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 29))
    .toISOString()
    .split('T')[0];

  await PaladiumStatus.deleteMany({ date: { $lt: `${thirtyDaysAgo}T00:00:00.000Z` } });
}
  
*/

export default async function updateCache() {
  try {
    const results = (await db.paladiumStatus.find().lean()) as StatusEntry[]
    cache.set('status:today', await statusFormaterToday(results))
    cache.set('status:last', await statusFormaterLast(results))
  } catch (error) {
    console.error('[Cache] [Paladium Status] Échec de la mise à jour du cache:', error)
  }
}
