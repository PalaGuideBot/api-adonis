import type { DailyEvent } from '#event/types'

const dailyEvents: DailyEvent[] = [
  {
    day: 'monday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'tuesday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'wednesday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '16h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'totem', name: 'Totem' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'thursday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'friday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '21h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'saturday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '15h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '21h30', id: 'koth', name: 'Koth' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'sunday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '15h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
]

export { dailyEvents }
