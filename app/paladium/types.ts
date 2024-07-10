export type LeaderboardCategory =
  | 'money'
  | 'job.alchemist'
  | 'job.hunter'
  | 'job.miner'
  | 'job.farmer'
  | 'boss'
  | 'egghunt'
  | 'end'
  | 'chorus'
  | 'koth'

export type LeaderboardTrixiumCategory = 'player' | 'faction'

export type ApiResponseError = {
  type: 'API_ERROR' | 'INVALID_REQUEST_ERROR' | 'AUTHORIZATION_ERROR'
  message: string
}
