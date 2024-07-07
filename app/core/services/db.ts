import Factions from '#models/factions'
import LeaderboardBoss from '#models/leaderboard_boss'
import LeaderboardChorus from '#models/leaderboard_chorus'
import LeaderboardClicker from '#models/leaderboard_clicker'
import LeaderboardEggHunt from '#models/leaderboard_egg_hunt'
import LeadearboardEnd from '#models/leaderboard_end'
import LeaderboardFactions from '#models/leaderboard_factions'
import LeaderboardKoth from '#models/leaderboard_koth'
import LeaderboardMoney from '#models/leaderboard_money'
import LeaderboardTrixiumFaction from '#models/leaderboard_trixium_faction'
import LeaderboardTrixiumUser from '#models/leaderboard_trixium_user'
import PaladiumStatus from '#models/paladium_status'
import Users from '#models/users'

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
}
