import { RuntimeException } from '@adonisjs/core/exceptions'
import { type Secret } from '@adonisjs/core/helpers'
import type { ApplicationService } from '@adonisjs/core/types'
import fs from 'node:fs/promises'
import path from 'node:path'

import { secretsValidator } from '#core/validators/secret_validator'

const KEYSTORE_PATH = 'secrets'
const KEYSTORE_FILENAME = 'keys.json'

export default class SecretProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton('secret', () => new Map<string, Secret<string>>())
  }
  /**
   * The container bindings have booted
   */
  async boot() {
    const secret = await this.app.container.make('secret')
    const logger = await this.app.container.make('logger')

    await this.createFile()
    const keys = await this.fetchKeys()

    for (const key of keys) {
      secret.set(key.name, key.value)
    }

    logger.info(`${keys.length} API keys loaded`)
  }

  private async createFile() {
    const file = path.join(this.app.makePath(KEYSTORE_PATH), KEYSTORE_FILENAME)

    try {
      await fs.access(file, fs.constants.R_OK)
    } catch {
      await fs.writeFile(file, JSON.stringify([]))
    }
  }

  private async fetchKeys() {
    const file = path.join(this.app.makePath(KEYSTORE_PATH), KEYSTORE_FILENAME)
    try {
      const data = await fs.readFile(file, 'utf-8')
      const [error, result] = await secretsValidator.tryValidate(JSON.parse(data))

      if (error) {
        throw new Error()
      }

      return result
    } catch {
      throw new RuntimeException('Error occured while retreive API keys')
    }
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    secret: Map<string, Secret<string>>
  }
}
