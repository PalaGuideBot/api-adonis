import type { ApplicationService } from '@adonisjs/core/types'
import { BentoCache } from 'bentocache'

import stores from '#cache/stores'

export default class CacheProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('cache', () => {
      return new BentoCache({
        default: 'memory',
        stores: stores,
      })
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {
    if (this.app.inProduction) {
      return
    }

    const cache = await this.app.container.make('cache')
    const logger = await this.app.container.make('logger')

    cache.on('cache:hit', ({ key }) => {
      logger.info(`CACHE:HIT - ${JSON.stringify({ key })}`)
    })

    cache.on('cache:miss', ({ key }) => {
      logger.info(`CACHE:MISS - ${JSON.stringify({ key })}`)
    })

    cache.on('cache:written', ({ key }) => {
      logger.info(`CACHE:WRITTEN - ${JSON.stringify({ key })}`)
    })
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    const cache = await this.app.container.make('cache')
    await cache.disconnectAll()
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    cache: BentoCache<typeof stores>
  }
}
