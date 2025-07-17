import { Infer } from '@vinejs/vine/types'

import type { DailyEvent } from '#event/types'
import { factionOnYourMarksValidator } from '#paladium/validators/faction'

type FactionEventOnYourMarks = Infer<typeof factionOnYourMarksValidator>

const dailyEvents: DailyEvent[] = [
  {
    day: 'monday',
    events: [
      { time: '00h00', id: 'warzone', name: 'PVP Vanilla' },
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'warzone', name: 'PVP Vanilla' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'tuesday',
    events: [
      { time: '00h00', id: 'warzone', name: 'PVP Boosté' },
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'warzone', name: 'PVP Boosté' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '21h30', id: 'koth', name: 'Koth' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'wednesday',
    events: [
      { time: '00h00', id: 'warzone', name: 'PVP Sans Perte' },
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'warzone', name: 'PVP Sans Perte' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '21h00', id: 'totem', name: 'Totem' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'thursday',
    events: [
      { time: '00h00', id: 'warzone', name: 'PVP Sans Restriction' },
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'warzone', name: 'PVP Sans Restriction' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'friday',
    events: [
      { time: '00h00', id: 'warzone', name: 'PVP Incognito' },
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'warzone', name: 'PVP Incognito' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'end', name: 'End' },
      { time: '20h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'saturday',
    events: [
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '14h00', id: 'warzone', name: 'PVP Vanilla' },
      { time: '16h00', id: 'warzone', name: 'PVP Boosté' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '21h30', id: 'koth', name: 'KOTH' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
    ],
  },
  {
    day: 'sunday',
    events: [
      { time: '00h00', id: 'largage', name: 'Largage' },
      { time: '01h00', id: 'boss', name: 'Boss' },
      { time: '02h00', id: 'largage', name: 'Largage' },
      { time: '04h00', id: 'largage', name: 'Largage' },
      { time: '08h00', id: 'largage', name: 'Largage' },
      { time: '10h00', id: 'boss', name: 'Boss' },
      { time: '12h00', id: 'largage', name: 'Largage' },
      { time: '14h00', id: 'warzone', name: 'PVP Sans Perte' },
      { time: '16h00', id: 'warzone', name: 'PVP Sans Restriction' },
      { time: '16h00', id: 'largage', name: 'Largage' },
      { time: '18h00', id: 'boss', name: 'Boss' },
      { time: '18h00', id: 'largage', name: 'Largage' },
      { time: '19h00', id: 'egg-hunt', name: 'Egghunt' },
      { time: '20h00', id: 'largage', name: 'Largage' },
      { time: '21h00', id: 'totem', name: 'Totem' },
      { time: '22h00', id: 'boss', name: 'Boss' },
      { time: '22h00', id: 'largage', name: 'Largage' },
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
