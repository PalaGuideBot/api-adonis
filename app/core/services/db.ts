import Bot from '#models/api/bot'
import Drop from '#models/api/drop'
import EndpointAndKey from '#models/api/endpoint_and_key'
import Giveaway from '#models/api/giveaway'
import MinecraftLink from '#models/api/minecraft_link'
import Role from '#models/api/role'
import User from '#models/api/user'
import LeaderboardAlliance from '#models/paladium/leaderboard/leaderboard_alliance'
import LeaderboardBoss from '#models/paladium/leaderboard/leaderboard_boss'
import LeaderboardChorus from '#models/paladium/leaderboard/leaderboard_chorus'
import LeaderboardClicker from '#models/paladium/leaderboard/leaderboard_clicker'
import LeaderboardEggHunt from '#models/paladium/leaderboard/leaderboard_egg_hunt'
import LeadearboardEnd from '#models/paladium/leaderboard/leaderboard_end'
import LeaderboardFactions from '#models/paladium/leaderboard/leaderboard_factions'
import LeaderboardJobAlchemist from '#models/paladium/leaderboard/leaderboard_job_alchemist'
import LeaderboardJobFarmer from '#models/paladium/leaderboard/leaderboard_job_farmer'
import LeaderboardJobHunter from '#models/paladium/leaderboard/leaderboard_job_hunter'
import LeaderboardJobMiner from '#models/paladium/leaderboard/leaderboard_job_miner'
import LeaderboardKoth from '#models/paladium/leaderboard/leaderboard_koth'
import LeaderboardMoney from '#models/paladium/leaderboard/leaderboard_money'
import LeaderboardTrixiumFaction from '#models/paladium/leaderboard/leaderboard_trixium_faction'
import LeaderboardTrixiumPlayer from '#models/paladium/leaderboard/leaderboard_trixium_player'
import PaladiumStatus from '#models/paladium/paladium_status'
import Factions from '#models/paladium/unique/factions'
import PlayerWrapped from '#models/paladium/unique/player_wrapped'
import Players from '#models/paladium/unique/players'

export const db = {
  factions: Factions,
  players: Players,
  playersWrapped: PlayerWrapped,
  leaderboardBoss: LeaderboardBoss,
  leaderboardChorus: LeaderboardChorus,
  leaderboardClicker: LeaderboardClicker,
  leaderboardEggHunt: LeaderboardEggHunt,
  leaderboardEnd: LeadearboardEnd,
  leaderboardFactions: LeaderboardFactions,
  leaderboardKoth: LeaderboardKoth,
  leaderboardMoney: LeaderboardMoney,
  leaderboardTrixiumFaction: LeaderboardTrixiumFaction,
  leaderboardTrixiumPlayer: LeaderboardTrixiumPlayer,
  leaderboardAlliance: LeaderboardAlliance,
  leaderboardJobMiner: LeaderboardJobMiner,
  leaderboardJobFarmer: LeaderboardJobFarmer,
  leaderboardJobHunter: LeaderboardJobHunter,
  leaderboardJobAlchemist: LeaderboardJobAlchemist,
  paladiumStatus: PaladiumStatus,
  endpointAndKey: EndpointAndKey,
  minecraftLink: MinecraftLink,
  bot: Bot,
  role: Role,
  user: User,
  giveaway: Giveaway,
  drop: Drop,
}
