import { HttpContext } from '@adonisjs/core/http'
import mongoose from 'mongoose'

export default class DatabaseController {
  async check({ response }: HttpContext) {
    if (mongoose.connection.readyState === 1) {
      return response.ok({ message: 'connected' })
    } else {
      return response.badRequest({ message: 'disconnected' })
    }
  }
}
