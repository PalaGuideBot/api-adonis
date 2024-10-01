import { Infer } from '@vinejs/vine/types'

import buildings from '#paladium/contents/clicker/buildings'
import { playerClickerValidator } from '#paladium/validators/player'

type PlayerClikerData = Infer<typeof playerClickerValidator>

export function mergeBuildings(playerBuildings: PlayerClikerData['buildings']) {
  return buildings.map((building) => {
    const target = playerBuildings.find((playerBuilding) => playerBuilding.name === building.name)

    return {
      ...building,
      production: target?.production ?? Number(building.base_production),
      quantity: target?.quantity ?? 0,
    }
  })
}

export function getBuildingBaseProduction(power: number) {
  return 0.10000000149011612 * Math.pow(1.7999999523162842, power)
}
