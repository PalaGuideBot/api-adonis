export type Period = {
  from: string
  to: string
  status: string
}

export type StatusData = {
  date: string
  newDate: Date
  data: {
    java: {
      global: {
        status: Period[]
        players: number
        playersCount: number
      }
      factions: Record<string, Period[]>
    }
    launcher: {
      status: Period[]
    }
  }
}

export type StatusDataWithHour = StatusData & { hour: string }
