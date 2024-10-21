import { Infer } from '@vinejs/vine/types'

import type { DailyEvent } from '#event/types'
import { factionOnYourMarksValidator } from '#paladium/validators/faction'

type FactionEventOnYourMarks = Infer<typeof factionOnYourMarksValidator>

const dailyEvents: DailyEvent[] = [
  {
    day: 'monday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '17h00', id: 'black-market', name: 'Black Market' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '21h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'tuesday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '17h00', id: 'black-market', name: 'Black Market' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '21h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'wednesday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '15h00', id: 'black-market', name: 'Black Market' },
      { time: '16h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'totem', name: 'Totem' },
      { time: '20h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'thursday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '17h00', id: 'black-market', name: 'Black Market' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h30', id: 'on-your-marks', name: 'A vos marques' },
      { time: '21h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'friday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '17h00', id: 'black-market', name: 'Black Market' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '21h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '21h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'saturday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '15h00', id: 'black-market', name: 'Black Market' },
      { time: '15h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'black-market', name: 'Black Market' },
      { time: '21h30', id: 'koth', name: 'Koth' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
  {
    day: 'sunday',
    events: [
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'black-market', name: 'Black Market' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '15h00', id: 'on-your-marks', name: 'A vos marques' },
      { time: '17h00', id: 'black-market', name: 'Black Market' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '21h00', id: 'black-market', name: 'Black Market' },
      { time: '22h00', id: 'boss', name: 'Boss' },
    ],
  },
]

const getOnYourMarksGoalItem = (event: FactionEventOnYourMarks) => {
  switch (event.goalType) {
    case 'BREAK_BLOCKS':
    case 'MOB_KILL':
    case 'ITEM_CRAFT':
    case 'ITEM_SMELT':
    case 'ITEM_CRAFT_PALAMACHINE':
    case 'ITEM_ENCHANT':
    case 'GRINDER_CRAFT':
    case 'GRINDER_SMELT':
    case 'USE_ITEM':
      return event.extra ?? ''
    case 'FISHING':
      return 'fishing_rod'
    case 'WALK':
      return 'leather_boots'
    default:
      return ''
  }
}

export { dailyEvents, getOnYourMarksGoalItem }
