import { inject } from '@adonisjs/core'
import { InferSchemaType } from 'mongoose'

import { db } from '#core/services/db'
import { config } from '#leaderboard/contents/categories'
import { CategoryItem } from '#leaderboard/types'
import { ImageService } from '#paladium/services/image'

@inject()
class LeaderboardRepository {
  constructor(private imageService: ImageService) {}

  async get(category: CategoryItem) {
    switch (category.name) {
      case 'factions':
        const factions = await category.model.find()
        const serializedFactions = await this.serializeFactions(factions)
        return this.filterResult(serializedFactions as typeof factions)
      case 'trixium.faction':
        const trixiumFactions = await category.model.find()
        const serializedTrixiumFactions = await this.serializeTrixiumFactions(trixiumFactions)
        return this.filterResult(serializedTrixiumFactions as typeof trixiumFactions, 50)
      default:
        const data = await category.model.find()
        return this.filterResult(data, category.name === 'trixium.player' ? 50 : 100)
    }
  }

  private filterResult(
    data: InferSchemaType<(typeof config)[number]['model']['schema']>[],
    limit: number = 100
  ) {
    const lastData = (data.at(-1)?.data ?? []).slice(0, limit)

    const existingValues = new Set(
      lastData.map((item) => ('name' in item ? item.name : item.username))
    )

    return data.map((entry) => {
      if (Array.isArray(entry.data)) {
        const filteredData = entry.data.filter((item) =>
          existingValues.has('name' in item ? item.name : item.username)
        )
        return { date: entry.date, newDate: entry.newDate, data: filteredData }
      }
      return { date: entry.date, newDate: entry.newDate, data: [] }
    })
  }

  private async serializeFactions(data: InferSchemaType<typeof db.leaderboardFactions.schema>[]) {
    const lastData = data.at(-1)

    if (!lastData) {
      return data
    }

    return [
      ...data.filter((item) => item.date !== lastData.date),
      {
        date: lastData.date,
        newDate: lastData.newDate,
        data: await Promise.all(
          lastData.data.map(async (item, index) => {
            if (index < 3) {
              const faction = await db.factions.findOne({ name: item.name.toLowerCase() }).lean()

              if (!faction) {
                return item
              }

              let emblem
              try {
                emblem = await this.imageService.getOrCreateEmblem(faction.emblem)
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
    data: InferSchemaType<typeof db.leaderboardTrixiumFaction.schema>[]
  ) {
    const firstData = data.at(0)
    const lastData = data.at(-1)

    const UUIDs = (firstData?.data ?? []).map((item) => item.uuid)
    const factions = await db.factions.find({ uuid: { $in: UUIDs } }).lean()

    if (lastData) {
      data = [
        ...data.filter((item) => item.date !== lastData.date),
        {
          date: lastData.date,
          newDate: lastData.newDate,
          data: await Promise.all(
            lastData.data.map(async (item, index) => {
              if (index < 3) {
                const faction = await db.factions.findOne({ uuid: item.uuid }).lean()

                if (!faction) {
                  return item
                }

                let emblem
                try {
                  emblem = await this.imageService.getOrCreateEmblem(faction.emblem)
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

    return data.map((entry) => {
      if (Array.isArray(entry.data)) {
        const parsedData = entry.data.map((item) => {
          const faction = factions.find((x) => x.uuid === item.uuid)
          return faction
            ? {
                uuid: item.uuid,
                value: item.value,
                emblemUrl: item.emblemUrl,
                name: faction.bgName ?? faction.name,
              }
            : item
        })
        return { date: entry.date, newDate: entry.newDate, data: parsedData }
      }
      return { date: entry.date, newDate: entry.newDate, data: [] }
    })
  }
}

export { LeaderboardRepository }
