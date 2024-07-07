import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import mongoose from 'mongoose'

export default class MongooseProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    await mongoose.connect(env.get('DATABASE_URL'))
  }

  async shutdown() {
    await mongoose.disconnect()
  }
}
