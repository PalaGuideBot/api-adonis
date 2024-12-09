type OSState = {
  default: number
  with_mixed: number
  with_green: number
  with_pet_skill: (petSkillPercentage: number) => number
  with_pet_skill_and_mixed: (petSkillPercentage: number, mixedState: number) => number
}

export type Item = {
  name: string
  id: string
  xp: number
  from: OSState
}

export type JobReward = {
  label: string
  id: string
  type: 'item' | 'currency' | 'craft' | 'usage' | 'command'
  quantity?: number
}
