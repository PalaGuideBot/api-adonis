import type { ApplicationService } from '@adonisjs/core/types'

import { EndpointManager } from '#usage/services/endpoint_manager'

export default class EndpointProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('endpoint.manager', () => new EndpointManager())
  }

  /**
   * The process has been started
   */
  async ready() {
    const manager = await this.app.container.make('endpoint.manager')

    // Schedule the task to run every 5 minutes
    manager.schedule('*/5 * * * *')
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    const manager = await this.app.container.make('endpoint.manager')
    manager.stopSchedule()
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    'endpoint.manager': EndpointManager
  }
}
