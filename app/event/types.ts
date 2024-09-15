export type Event = {
  id: string
  name: string
  time: string
}

export type DailyEvent = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  events: Event[]
}
