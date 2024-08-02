import type { ApplicationService } from '@adonisjs/core/types'
import { Server } from 'socket.io'

import corsConfig from '#config/cors'
import UnauthorizedException from '#exceptions/unauthorized_exception'
import AuthMiddleware from '#middleware/auth_middleware'

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The process has been started
   */
  async ready() {
    const server = await this.app.container.make('server')

    const socket = new Server(server.getNodeServer(), {
      cors: {
        origin: typeof corsConfig.origin !== 'function' && corsConfig.origin,
        credentials: corsConfig.credentials,
        methods: corsConfig.methods,
        allowedHeaders:
          typeof corsConfig.headers !== 'function' && typeof corsConfig.headers !== 'boolean'
            ? corsConfig.headers
            : undefined,
        exposedHeaders: corsConfig.exposeHeaders,
        maxAge: corsConfig.maxAge,
      },
      allowRequest: (request, callback) => {
        const token = request.headers.authorization

        let parsedToken

        try {
          parsedToken = AuthMiddleware.validateToken(token)
        } catch {
          return callback(UnauthorizedException.message, false)
        }

        if (!AuthMiddleware.isTokenAuthorized(parsedToken)) {
          return callback(UnauthorizedException.message, false)
        }

        return callback(null, true)
      },
      path: '/ws',
    })

    this.app.container.bind('socket', () => socket)
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    const socket = await this.app.container.make('socket')
    socket.disconnectSockets()
    socket.close()
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    socket: Server
  }
}
