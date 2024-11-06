export type PogItem = {
  name: string
  xp: number
  from: number
  to: number
}

export type JobReward = {
  label: string
  id: string
  type: 'item' | 'currency' | 'craft' | 'usage' | 'command'
  quantity?: number
}
