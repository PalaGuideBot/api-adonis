import Factions from '#models/paladium/unique/factions'
import LeaderboardBoss from '#models/paladium/leaderboard/leaderboard_boss'
import LeaderboardChorus from '#models/paladium/leaderboard/leaderboard_chorus'
import LeaderboardClicker from '#models/paladium/leaderboard/leaderboard_clicker'
import LeaderboardEggHunt from '#models/paladium/leaderboard/leaderboard_egg_hunt'
import LeadearboardEnd from '#models/paladium/leaderboard/leaderboard_end'
import LeaderboardFactions from '#models/paladium/leaderboard/leaderboard_factions'
import LeaderboardKoth from '#models/paladium/leaderboard/leaderboard_koth'
import LeaderboardMoney from '#models/paladium/leaderboard/leaderboard_money'
import LeaderboardTrixiumFaction from '#models/paladium/leaderboard/leaderboard_trixium_faction'
import LeaderboardTrixiumPlayer from '#models/paladium/leaderboard/leaderboard_trixium_player'
import Players from '#models/paladium/unique/players'
import PaladiumStatus from '#models/paladium/paladium_status'
import EndpointAndKey from '#models/api/endpoint_and_key'
import MinecraftLink from '#models/api/minecraft_link'
import Bot from '#models/api/bot'
import Role from '#models/api/role'

export const db = {
  factions: Factions,
  players: Players,
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
  paladiumStatus: PaladiumStatus,
  endpointAndKey: EndpointAndKey,
  minecraftLink: MinecraftLink,
  bot: Bot,
  role: Role,
}
