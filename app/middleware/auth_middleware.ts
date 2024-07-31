import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

import secret from '#core/services/secret'
import UnauthorizedException from '#exceptions/unauthorized_exception'

const API_PREFIX = 'Bearer '

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn, names: string[] = []) {
    const guardNames = names.map((name) => name.toLowerCase())
    const token = ctx.request.header('Authorization')

    if (!token || !new RegExp(`^${API_PREFIX}`).test(token)) {
      throw new UnauthorizedException()
    }

    const parsedToken = token.replace(API_PREFIX, '')

    if (
      !Array.from(secret.values()).find((value) => value.release() === parsedToken) ||
      (guardNames.length &&
        !guardNames.map((name) => secret.get(name)?.release()).includes(parsedToken))
    ) {
      throw new UnauthorizedException()
    }

    return next()
  }
}
