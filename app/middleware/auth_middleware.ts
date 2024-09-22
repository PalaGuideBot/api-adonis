import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

import secret from '#core/services/secret'
import UnauthorizedException from '#exceptions/unauthorized_exception'

const API_PREFIX = 'Bearer '

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn, names: string[] = []) {
    return next()
    const token = ctx.request.header('Authorization')

    const parsedToken = AuthMiddleware.validateToken(token)

    if (!AuthMiddleware.isTokenAuthorized(parsedToken, names)) {
      throw new UnauthorizedException()
    }

    return next()
  }

  static validateToken(token?: string) {
    if (!token || !new RegExp(`^${API_PREFIX}`).test(token)) {
      throw new UnauthorizedException()
    }

    return token.replace(API_PREFIX, '')
  }

  static isTokenAuthorized(token: string, names: string[] = []) {
    const guardNames = names.map((name) => name.toLowerCase())

    const tokenExists = Array.from(secret.values()).find((value) => value.release() === token)

    const availableInNames =
      guardNames.length !== 0
        ? guardNames.map((name) => secret.get(name)?.release()).includes(token)
        : true

    return tokenExists && availableInNames
  }
}
