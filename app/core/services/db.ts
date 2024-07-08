import Factions from '#models/unique/factions'
import LeaderboardBoss from '#models/leaderboard/leaderboard_boss'
import LeaderboardChorus from '#models/leaderboard/leaderboard_chorus'
import LeaderboardClicker from '#models/leaderboard/leaderboard_clicker'
import LeaderboardEggHunt from '#models/leaderboard/leaderboard_egg_hunt'
import LeadearboardEnd from '#models/leaderboard/leaderboard_end'
import LeaderboardFactions from '#models/leaderboard/leaderboard_factions'
import LeaderboardKoth from '#models/leaderboard/leaderboard_koth'
import LeaderboardMoney from '#models/leaderboard/leaderboard_money'
import LeaderboardTrixiumFaction from '#models/leaderboard/leaderboard_trixium_faction'
import LeaderboardTrixiumUser from '#models/leaderboard/leaderboard_trixium_user'
import Users from '#models/unique/users'
import PaladiumStatus from '#models/paladium_status'
import EndpointAndKey from '#models/endpoint_and_key'
import MinecraftLink from '#models/minecraft_link'
import Bot from '#models/bot'

export const db = {
  factions: Factions,
  users: Users,
  leaderboardBoss: LeaderboardBoss,
  leaderboardChorus: LeaderboardChorus,
  leaderboardClicker: LeaderboardClicker,
  leaderboardEggHunt: LeaderboardEggHunt,
  leaderboardEnd: LeadearboardEnd,
  leaderboardFactions: LeaderboardFactions,
  leaderboardKoth: LeaderboardKoth,
  leaderboardMoney: LeaderboardMoney,
  leaderboardTrixiumFaction: LeaderboardTrixiumFaction,
  leaderboardTrixiumUser: LeaderboardTrixiumUser,
  paladiumStatus: PaladiumStatus,
  endpointAndKey: EndpointAndKey,
  minecraftLink: MinecraftLink,
  bot: Bot,
}
