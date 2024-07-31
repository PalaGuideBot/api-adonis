import { DateTime } from 'luxon'
import { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import type { Period, StatusData, StatusDataWithHour } from '#other/types'

type InferedPaladiumStatusData = InferSchemaType<typeof db.paladiumStatus.schema>

class StatusRepository {
  async findAll() {
    const now = DateTime.now()
    const status = await db.paladiumStatus.find().lean()
    return {
      day: this.parseDataByDay(status),
      hour: this.parseDataByHour(
        status.filter((entry) => now.hasSame(DateTime.fromSQL(entry.date), 'day'))
      ),
    }
  }

  private parseDataByDay(data: InferedPaladiumStatusData[]): StatusData[] {
    const groupedByDate = groupDataBy(data, (entry) => entry.date.split(' ')[0])

    const result: StatusData[] = Object.entries(groupedByDate).map(([date, entries]) => {
      const { globalStatus, factionsStatus, launcherStatus, averagePlayers, playersCount } =
        processEntries(entries, 'day')

      return {
        date,
        data: {
          java: {
            global: {
              status: globalStatus,
              players: averagePlayers,
              playersCount,
            },
            factions: factionsStatus,
          },
          launcher: {
            status: launcherStatus,
          },
        },
      }
    })

    return result.toSorted((a, b) =>
      DateTime.fromSQL(a.date).diff(DateTime.fromSQL(b.date)).as('milliseconds')
    )
  }

  private parseDataByHour(data: InferedPaladiumStatusData[]): StatusDataWithHour[] {
    const groupedByHour = groupDataBy(data, (entry) =>
      entry.date.split(' ')[1].split(':')[0].padStart(2, '0')
    )

    const result: StatusDataWithHour[] = Object.entries(groupedByHour).map(([hour, entries]) => {
      const { globalStatus, factionsStatus, launcherStatus, averagePlayers, playersCount } =
        processEntries(entries, 'hour')

      return {
        date: entries[0].date.split(' ')[0],
        hour,
        data: {
          java: {
            global: {
              status: globalStatus,
              players: averagePlayers,
              playersCount,
            },
            factions: factionsStatus,
          },
          launcher: {
            status: launcherStatus,
          },
        },
      }
    })

    return result.toSorted((a, b) =>
      DateTime.fromSQL(`${a.date} ${a.hour}:00:00`)
        .diff(DateTime.fromSQL(`${b.date} ${b.hour}:00:00`))
        .as('milliseconds')
    )
  }
}

function groupDataBy<T extends string>(
  data: InferedPaladiumStatusData[],
  getKey: (entry: (typeof data)[number]) => T
) {
  return data.reduce(
    (acc, entry) => {
      const key = getKey(entry)
      if (!acc[key]) acc[key] = []
      acc[key].push(entry)
      return acc
    },
    {} as Record<T, typeof data>
  )
}

function processEntries(entries: InferedPaladiumStatusData[], scale: 'day' | 'hour') {
  const globalStatus: Period[] = []
  const factionsStatus: Record<string, Period[]> = {}
  const launcherStatus: Period[] = []
  let playersSum = 0
  let playersCount = 0

  let previousGlobalStatus = entries[0].data.java.global.status
  let previousLauncherStatus = entries[0].data.launcher.status
  let startTimeGlobal = entries[0].date.split(' ')[1]
  let startTimeLauncher = entries[0].date.split(' ')[1]
  let previousFactionStatus: Record<string, string> = {}
  let startTimeFactions: Record<string, string> = {}

  for (const faction in entries[0].data.java.factions) {
    // @ts-ignore
    previousFactionStatus[faction] = entries[0].data.java.factions[faction]
    startTimeFactions[faction] = entries[0].date.split(' ')[1]
  }

  for (const entry of entries) {
    const time = entry.date.split(' ')[1]
    const { java, launcher } = entry.data

    playersSum += java.global.players
    playersCount++

    if (java.global.status !== previousGlobalStatus) {
      globalStatus.push({ from: startTimeGlobal, to: time, status: previousGlobalStatus })
      previousGlobalStatus = java.global.status
      startTimeGlobal = time
    }

    if (launcher.status !== previousLauncherStatus) {
      launcherStatus.push({ from: startTimeLauncher, to: time, status: previousLauncherStatus })
      previousLauncherStatus = launcher.status
      startTimeLauncher = time
    }

    for (const faction in java.factions) {
      // @ts-ignore
      if (java.factions[faction] !== previousFactionStatus[faction]) {
        if (!factionsStatus[faction]) {
          factionsStatus[faction] = []
        }
        factionsStatus[faction].push({
          from: startTimeFactions[faction],
          to: time,
          status: previousFactionStatus[faction],
        })
        // @ts-ignore
        previousFactionStatus[faction] = java.factions[faction]
        startTimeFactions[faction] = time
      }
    }
  }

  globalStatus.push({
    from: startTimeGlobal,
    to:
      scale === 'day'
        ? '23:59:59'
        : DateTime.fromSQL(startTimeGlobal)
            .plus({ hours: 1 })
            .startOf('hour')
            .toFormat('HH:mm:ss')!,
    status: previousGlobalStatus,
  })
  launcherStatus.push({
    from: startTimeLauncher,
    to:
      scale === 'day'
        ? '23:59:59'
        : DateTime.fromSQL(startTimeLauncher)
            .plus({ hours: 1 })
            .startOf('hour')
            .toFormat('HH:mm:ss')!,
    status: previousLauncherStatus,
  })

  for (const faction in previousFactionStatus) {
    if (!factionsStatus[faction]) {
      factionsStatus[faction] = []
    }
    factionsStatus[faction].push({
      from: startTimeFactions[faction],
      to: DateTime.fromSQL(startTimeFactions[faction])
        .plus({ hours: 1 })
        .startOf('hour')
        .toFormat('HH:mm:ss')!,
      status: previousFactionStatus[faction],
    })
  }

  const averagePlayers = playersSum / playersCount

  return {
    globalStatus: globalStatus.reverse(),
    factionsStatus: Object.fromEntries(
      Object.entries(factionsStatus).map(([faction, status]) => [faction, status.reverse()])
    ),
    launcherStatus: launcherStatus.reverse(),
    averagePlayers,
    playersCount,
  }
}

export { StatusRepository }
