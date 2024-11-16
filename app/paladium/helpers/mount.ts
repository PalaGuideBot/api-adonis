const MOUNT_MAX_LEVEL = 100

export function getMountLevel(experience: number): number {
  let sum = 0
  for (let i = 1; i <= Number.MAX_VALUE; i++) {
    sum = Math.floor(sum + Math.pow(i, 2.5))
    if (experience < sum) {
      return i
    }
  }
  return MOUNT_MAX_LEVEL
}
