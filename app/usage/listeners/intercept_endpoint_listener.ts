import { ResponseStatus } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { type HttpRequestFinishedPayload } from '@adonisjs/core/types/http'

import { findSecretKeyByValue } from '#core/services/secret'
import AuthMiddleware from '#middleware/auth_middleware'

class InterceptEndpointListener {
  constructor() {}

  async handle(payload: HttpRequestFinishedPayload) {
    const { ctx, duration } = payload

    const manager = await app.container.make('endpoint.manager')

    const responseStatus = ctx.response.getStatus()

    if (
      !([ResponseStatus.Ok, ResponseStatus.Created, ResponseStatus.NoContent] as number[]).includes(
        responseStatus
      )
    ) {
      return
    }

    const endpoint = ctx.route?.name

    if (endpoint) {
      manager.collectEndpoint(endpoint, this.#hrTimeToMilliseconds(duration))
    }

    let apiKey
    try {
      apiKey = AuthMiddleware.validateToken(ctx.request.header('Authorization'))
      apiKey = findSecretKeyByValue(apiKey)
    } catch (error: unknown) {}

    if (apiKey) {
      manager.collectKey(apiKey, ctx.request.ip())
    }
  }

  #hrTimeToMilliseconds(duration: [number, number]) {
    return duration[0] * 1000 + duration[1] / 1000000
  }
}

export { InterceptEndpointListener as default }
