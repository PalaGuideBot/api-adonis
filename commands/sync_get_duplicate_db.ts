import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import { db } from '#core/services/db'

export default class SyncGetDuplicate extends BaseCommand {
  static commandName = 'sync:get_duplicate_db'

  protected prefix = 'SyncGetDuplicateDB'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const players = await db.players.find().lean()

    const nameMap = new Map<string, Map<string, any[]>>()

    for (const player of players) {
      const rawName = player.username ?? ''
      const name = String(rawName).trim().toLowerCase()
      if (!name) continue

      if (!nameMap.has(name)) nameMap.set(name, new Map())
      const uuidMap = nameMap.get(name)!

      const uuid = player.uuid ?? 'unknown'
      if (!uuidMap.has(uuid)) uuidMap.set(uuid, [])
      uuidMap.get(uuid)!.push(player)
    }

    const duplicates: Array<{ username: string; uuids: { uuid: string; players: any[] }[] }> = []

    for (const [username, uuidMap] of nameMap.entries()) {
      if (uuidMap.size > 1) {
        const uuids: { uuid: string; players: any[] }[] = []
        for (const [uuid, playersArr] of uuidMap.entries()) {
          uuids.push({ uuid, players: playersArr.map((p) => ({ _id: p._id, uuid: p.uuid })) })
        }
        duplicates.push({ username, uuids })
      }
    }

    this.logger.info(`Found ${duplicates.length} usernames that map to multiple UUIDs`, {
      prefix: this.prefix,
    })

    for (const dup of duplicates) {
      this.logger.info(`Username: ${dup.username}`, { prefix: this.prefix })
      for (const u of dup.uuids) {
        this.logger.info(`  UUID: ${u.uuid} -> ${u.players.map((p) => String(p._id)).join(', ')}`, {
          prefix: this.prefix,
        })
      }
    }
  }
}
