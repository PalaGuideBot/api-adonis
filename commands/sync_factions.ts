import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import { db } from '#core/services/db'
import { PaladiumService } from '#paladium/services/paladium'

export default class SyncFactions extends BaseCommand {
  static commandName = 'sync:factions'
  static description = ''

  protected prefix = 'SyncFactions'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(paladiumService: PaladiumService) {
    const now = DateTime.now().toSQLDate()

    const factions = await db.factions.find({
      'data': {
        $not: {
          $elemMatch: {
            date: now,
          },
        },
      },
      'retry.count': { $lt: 10 },
      'retry.disabled': false,
    })

    const bulkOperations = []
    let updated = 0

    for (const faction of factions) {
      const uuid = faction.uuid
      const id = faction._id

      let factionData = null

      try {
        factionData = await paladiumService.getAllFactionData(uuid)
      } catch {}

      if (factionData) {
        updated++
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $push: {
                data: {
                  date: now,
                  newDate: new Date(),
                  data: {
                    level: {
                      level: factionData.level.level,
                      xp: factionData.level.xp,
                    },
                    elo: 0,
                  },
                },
              },
              $set: {
                players: factionData.members.data.map((member) => ({
                  group: member.group,
                  joinedAt: member.joinedAt,
                  username: member.username,
                  uuid: member.uuid,
                })),
                emblem: factionData.emblem,
                retry: {
                  count: 0,
                  disabled: false,
                },
              },
            },
          },
        })
      } else {
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $set: {
                retry: {
                  count: faction.retry?.count ? faction.retry.count + 1 : 1,
                  disabled: faction.retry?.count ? faction.retry.count >= 10 : true,
                },
              },
            },
          },
        })
      }
    }

    if (bulkOperations.length > 0) {
      await db.factions.bulkWrite(bulkOperations)
      this.logger.info(`${updated} factions synced !`, { prefix: this.prefix })
    }
  }
}
