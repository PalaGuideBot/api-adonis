import { ConnectionStates } from 'mongoose'

const status: Record<ConnectionStates, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
  99: 'uninitialized',
} as const

export { status }
