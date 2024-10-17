const PET_MAX_LEVEL = 100

function getRequiredExperienceForLevel(level: number): number {
  if (level <= 0) {
    return 0.0
  }
  return ((level * level - 1) * 90.0) / level + 300.0 + getRequiredExperienceForLevel(level - 1)
}

export function getPetLevel(experience: number): number {
  let level = 0
  while (getRequiredExperienceForLevel(level) <= experience) {
    level++
    if (level >= PET_MAX_LEVEL) {
      return PET_MAX_LEVEL
    }
  }
  return level
}
