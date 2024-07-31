import { inject } from '@adonisjs/core'
import { HydratedDocument, InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import { config } from '#leaderboard/contents/categories'
import { CategoryItem } from '#leaderboard/types'
import { MeService } from '#paladium/services/me'

@inject()
class LeaderboardRepository {
  constructor(private meService: MeService) {}

  async get(category: CategoryItem) {
    switch (category.name) {
      case 'factions':
        const factions = await category.model.find()
        const serializedFactions = await this.serializeFactions(factions)
        return this.filterResult(serializedFactions as typeof factions)
      case 'trixium.faction':
        const trixiumFactions = await category.model.find()
        const serializedTrixiumFactions = await this.serializeTrixiumFactions(trixiumFactions)
        return this.filterResult(serializedTrixiumFactions as typeof trixiumFactions)
      default:
        const data = await category.model.find()
        return this.filterResult(data)
    }
  }

  private filterResult(
    data: HydratedDocument<InferSchemaType<(typeof config)[number]['model']['schema']>>[]
  ) {
    const lastData = data[data.length - 1].data.slice(0, 100)
    const existingValues = new Set(
      lastData.map((item) => ('name' in item ? item.name : item.username))
    )

    return data.map((entry) => {
      if (Array.isArray(entry.data)) {
        const filteredData = entry.data.filter((item) =>
          existingValues.has('name' in item ? item.name : item.username)
        )
        return { date: entry.date, data: filteredData }
      }
      return { date: entry.date, data: [] }
    })
  }

  private async serializeFactions(
    data: HydratedDocument<InferSchemaType<typeof db.leaderboardFactions.schema>>[]
  ) {
    const lastData = data[data.length - 1]

    return [
      ...data.filter((item) => item.date !== lastData.date),
      {
        date: lastData.date,
        data: await Promise.all(
          lastData.data.map(async (item, index) => {
            if (index < 3) {
              const faction = await db.factions.findOne({ name: item.name.toLowerCase() }).lean()

              if (!faction) {
                return item
              }

              let emblem
              try {
                emblem = await this.meService.postImageEmbleme(faction.emblem)
              } catch {}

              if (emblem) {
                item.emblemUrl = emblem.url
              }
            }
            return item
          })
        ),
      },
    ]
  }

  private async serializeTrixiumFactions(
    data: HydratedDocument<InferSchemaType<typeof db.leaderboardTrixiumFaction.schema>>[]
  ) {
    const lastData = data[data.length - 1]

    const UUIDs = data[0].data.map((item) => item.uuid)

    const factions = await db.factions.find({ uuid: { $in: UUIDs } }).lean()

    return [
      ...data.filter((item) => item.date !== lastData.date),
      {
        date: lastData.date,
        data: await Promise.all(
          lastData.data.map(async (item, index) => {
            if (index < 3) {
              const faction = await db.factions.findOne({ uuid: item.uuid }).lean()

              if (!faction) {
                return item
              }

              let emblem
              try {
                emblem = await this.meService.postImageEmbleme(faction.emblem)
              } catch {}

              if (emblem) {
                item.emblemUrl = emblem.url
              }
            }
            return item
          })
        ),
      },
    ].map((entry) => {
      if (Array.isArray(entry.data)) {
        const parsedData = entry.data.map((item) => {
          const faction = factions.find((x) => x.uuid === item.uuid)
          return faction
            ? {
                uuid: item.uuid,
                value: item.value,
                emblemUrl: item.emblemUrl,
                name: faction.name,
              }
            : item
        })
        return { date: entry.date, data: parsedData }
      }
      return { date: entry.date, data: [] }
    })
  }
}

export { LeaderboardRepository }
