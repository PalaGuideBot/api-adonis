export type Item = {
  name: string
  id: string
  durability: number
  xp: number
}

export type JobReward = {
  label: string
  id: string
  type: 'item' | 'currency' | 'craft' | 'usage' | 'command'
  quantity?: number
}
