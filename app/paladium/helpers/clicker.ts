import { Infer } from '@vinejs/vine/types'

import buildings from '#paladium/contents/clicker/buildings'
import upgrades from '#paladium/contents/clicker/upgrades'
import { playerClickerValidator, playerJobsValidator } from '#paladium/validators/player'

type PlayerClikerData = Infer<typeof playerClickerValidator>
type PlayerJobsData = Infer<typeof playerJobsValidator>

export function mergeBuildings(
  playerBuildings: PlayerClikerData['buildings']
): PlayerClikerData['buildings'] {
  return buildings.map((building) => {
    const target = playerBuildings.find((playerBuilding) => playerBuilding.name === building.name)

    return {
      name: building.name,
      production: target?.production ?? Number(building.base_production),
      quantity: target?.quantity ?? 0,
    }
  })
}

export function getBuildingBaseProduction(power: number) {
  return 0.10000000149011612 * Math.pow(1.7999999523162842, power)
}

function getTerrainUpgradeBonusByBuilding(
  targetBuilding: string,
  playerUpgrades: PlayerClikerData['upgrades'],
  playerJobs: PlayerJobsData
) {
  let percentage = 0
  const terrain = upgrades.terrains.find(
    (item) => item.item.includes(targetBuilding) && playerUpgrades.includes(item.name)
  )

  //TODO: vérifier lorsque l'on a plus de 1 terrain

  if (!terrain) {
    return percentage
  }

  switch (true) {
    case terrain.name.includes('miner'):
      percentage += playerJobs?.miner?.level ?? 0 * 0.01
      break
    case terrain.name.includes('farmer'):
      percentage += playerJobs?.farmer?.level ?? 0 * 0.01
      break
    case terrain.name.includes('hunter'):
      percentage += playerJobs?.hunter?.level ?? 0 * 0.01
      break
    case terrain.name.includes('alchemist'):
      percentage += playerJobs?.alchemist?.level ?? 0 * 0.01
      break
  }

  // TODO: vérifier lorsque l'on a un terrain inconnu

  return percentage
}

function getGlobalUpgradeBonus(playerUpgrades: PlayerClikerData['upgrades']) {
  const ownedUpgrades = upgrades.globals.filter((upgrade) => playerUpgrades.includes(upgrade.name))
  return ownedUpgrades.length * 0.1
}

function getCategoryUpgradeBonusByBuilding(
  targetBuilding: string,
  playerUpgrades: PlayerClikerData['upgrades']
) {
  const ownedUpgrades = upgrades.categories.filter(
    (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
  )
  return ownedUpgrades.reduce((acc, upgrade) => acc + upgrade.pourcentage, 0)
}

function getManyUpgradeBonusByBuilding(
  targetBuilding: string,
  playerUpgrades: PlayerClikerData['upgrades'],
  playerBuildings: PlayerClikerData['buildings']
) {
  const many = upgrades.many.find(
    (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
  )

  //TODO: vérifier lorsque l'on a plus de 1 upgrade

  if (many) {
    const building = playerBuildings.find(
      (playerBuilding) => playerBuilding.name === targetBuilding
    )

    return Number(building?.quantity) * 0.01
  }

  return 0
}

function getBuildingUpgradeBonus(
  targetBuilding: string,
  playerUpgrades: PlayerClikerData['upgrades']
) {
  const ownedBuildings = upgrades.buildings.filter(
    (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
  )

  //TODO: vérifier lorsque l'on a plus de 2 upgrades

  return ownedBuildings.length
}

function getPosteriorUpgradeBonus(
  targetBuilding: string,
  playerUpgrades: PlayerClikerData['upgrades'],
  playerBuildings: PlayerClikerData['buildings']
) {
  const posterior = upgrades.posteriors.find(
    (upgrade) =>
      playerUpgrades.includes(upgrade.name) && upgrade.activeItem.includes(targetBuilding)
  )

  // TODO: vérifier lorsque l'on a plus de 1 upgrade

  if (posterior) {
    const building = playerBuildings.find((playerBuilding) =>
      posterior.previousItem.includes(playerBuilding.name)
    )

    return Number(building?.quantity) * 0.01
  }

  return 0
}

export function calculateBuildingProduction(
  targetBuilding: string,
  playerClickerData: PlayerClikerData,
  playerJobs: PlayerJobsData
) {
  const building = playerClickerData.buildings.find(
    (playerBuilding) => playerBuilding.name === targetBuilding
  )

  const buildingBaseProduction = Number(
    buildings.find((item) => item.name === targetBuilding)?.base_production
  )

  if (!building) {
    return 0
  }

  const terrainBonus = getTerrainUpgradeBonusByBuilding(
    targetBuilding,
    playerClickerData.upgrades,
    playerJobs
  )
  const globalBonus = getGlobalUpgradeBonus(playerClickerData.upgrades)
  const categoryBonus = getCategoryUpgradeBonusByBuilding(
    targetBuilding,
    playerClickerData.upgrades
  )
  const manyBonus = getManyUpgradeBonusByBuilding(
    targetBuilding,
    playerClickerData.upgrades,
    playerClickerData.buildings
  )
  const buildingBonus = getBuildingUpgradeBonus(targetBuilding, playerClickerData.upgrades)
  const posteriorBonus = getPosteriorUpgradeBonus(
    targetBuilding,
    playerClickerData.upgrades,
    playerClickerData.buildings
  )

  const bonuses = [
    terrainBonus,
    globalBonus,
    categoryBonus,
    manyBonus,
    buildingBonus,
    posteriorBonus,
  ]

  const bonus = bonuses.reduce((acc, value) => acc + value, 1)

  return buildingBaseProduction * bonus
}
