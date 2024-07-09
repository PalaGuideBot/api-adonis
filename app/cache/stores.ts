import { bentostore } from 'bentocache'
import { memoryDriver } from 'bentocache/drivers/memory'

const stores = {
  memory: bentostore().useL1Layer(memoryDriver({ maxSize: 10_000 })),
} satisfies Record<string, ReturnType<typeof bentostore>>

export { stores as default }
