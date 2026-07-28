import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'commands.update': { paramsTuple?: []; params?: {} }
    'guilds.update': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple?: []; params?: {} }
    'bot.statistics': { paramsTuple?: []; params?: {} }
    'events.faction.quest': { paramsTuple?: []; params?: {} }
    'events.faction.on-your-marks': { paramsTuple?: []; params?: {} }
    'events.daily': { paramsTuple?: []; params?: {} }
    'leaderboard.global': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'leaderboard.trixium': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'link.generate': { paramsTuple?: []; params?: {} }
    'link.verify': { paramsTuple?: []; params?: {} }
    'link.discord.show': { paramsTuple: [ParamValue]; params: {'discordId': ParamValue} }
    'link.discord.remove': { paramsTuple: [ParamValue]; params: {'discordId': ParamValue} }
    'link.discord.index': { paramsTuple?: []; params?: {} }
    'link.minecraft.show': { paramsTuple: [ParamValue]; params: {'minecraftUUID': ParamValue} }
    'link.minecraft.remove': { paramsTuple: [ParamValue]; params: {'minecraftUUID': ParamValue} }
    'link.minecraft.index': { paramsTuple?: []; params?: {} }
    'update': { paramsTuple?: []; params?: {} }
    'giveaways.index': { paramsTuple?: []; params?: {} }
    'giveaways.active': { paramsTuple?: []; params?: {} }
    'giveaways.check': { paramsTuple?: []; params?: {} }
    'giveaways.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.create': { paramsTuple?: []; params?: {} }
    'giveaways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.participate': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.leave': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.draw': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.state': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'discordId': ParamValue} }
    'other.duplicates.index': { paramsTuple?: []; params?: {} }
    'other.duplicates.create': { paramsTuple?: []; params?: {} }
    'paladium.seasons': { paramsTuple?: []; params?: {} }
    'status.database': { paramsTuple?: []; params?: {} }
    'status.paladium': { paramsTuple?: []; params?: {} }
    'players.index': { paramsTuple?: []; params?: {} }
    'players.search': { paramsTuple?: []; params?: {} }
    'players.views.increment': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'players': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'player.create': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.clicker': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.flags': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.jobs': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.wrapped': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.views': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'factions': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'faction.create': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'usage.statistics': { paramsTuple?: []; params?: {} }
    'role.index': { paramsTuple?: []; params?: {} }
    'role.show': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'role.create': { paramsTuple?: []; params?: {} }
    'role.update': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'role.delete': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.create': { paramsTuple?: []; params?: {} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.add_roles': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.remove_roles': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'utils.jobs.calculate': { paramsTuple?: []; params?: {} }
    'utils.jobs.items': { paramsTuple?: []; params?: {} }
    'utils.jobs.levels': { paramsTuple?: []; params?: {} }
    'utils.pog.calculate': { paramsTuple?: []; params?: {} }
    'utils.pog.items': { paramsTuple?: []; params?: {} }
    'utils.clicker.buildings': { paramsTuple?: []; params?: {} }
    'utils.clicker.upgrades': { paramsTuple?: []; params?: {} }
    'utils.craft.craft': { paramsTuple: [ParamValue,ParamValue]; params: {'item': ParamValue,'amount': ParamValue} }
    'utils.craft.items': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'commands.update': { paramsTuple?: []; params?: {} }
    'guilds.update': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple?: []; params?: {} }
    'link.generate': { paramsTuple?: []; params?: {} }
    'link.verify': { paramsTuple?: []; params?: {} }
    'giveaways.create': { paramsTuple?: []; params?: {} }
    'giveaways.participate': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.leave': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.draw': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'other.duplicates.create': { paramsTuple?: []; params?: {} }
    'players.search': { paramsTuple?: []; params?: {} }
    'players.views.increment': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'player.create': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'faction.create': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'role.create': { paramsTuple?: []; params?: {} }
    'user.create': { paramsTuple?: []; params?: {} }
    'utils.jobs.calculate': { paramsTuple?: []; params?: {} }
    'utils.pog.calculate': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'bot.statistics': { paramsTuple?: []; params?: {} }
    'events.faction.quest': { paramsTuple?: []; params?: {} }
    'events.faction.on-your-marks': { paramsTuple?: []; params?: {} }
    'events.daily': { paramsTuple?: []; params?: {} }
    'leaderboard.global': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'leaderboard.trixium': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'link.discord.show': { paramsTuple: [ParamValue]; params: {'discordId': ParamValue} }
    'link.discord.index': { paramsTuple?: []; params?: {} }
    'link.minecraft.show': { paramsTuple: [ParamValue]; params: {'minecraftUUID': ParamValue} }
    'link.minecraft.index': { paramsTuple?: []; params?: {} }
    'update': { paramsTuple?: []; params?: {} }
    'giveaways.index': { paramsTuple?: []; params?: {} }
    'giveaways.active': { paramsTuple?: []; params?: {} }
    'giveaways.check': { paramsTuple?: []; params?: {} }
    'giveaways.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.state': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'discordId': ParamValue} }
    'other.duplicates.index': { paramsTuple?: []; params?: {} }
    'paladium.seasons': { paramsTuple?: []; params?: {} }
    'status.database': { paramsTuple?: []; params?: {} }
    'status.paladium': { paramsTuple?: []; params?: {} }
    'players.index': { paramsTuple?: []; params?: {} }
    'players': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.clicker': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.flags': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.jobs': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.wrapped': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.views': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'factions': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'usage.statistics': { paramsTuple?: []; params?: {} }
    'role.index': { paramsTuple?: []; params?: {} }
    'role.show': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'utils.jobs.items': { paramsTuple?: []; params?: {} }
    'utils.jobs.levels': { paramsTuple?: []; params?: {} }
    'utils.pog.items': { paramsTuple?: []; params?: {} }
    'utils.clicker.buildings': { paramsTuple?: []; params?: {} }
    'utils.clicker.upgrades': { paramsTuple?: []; params?: {} }
    'utils.craft.craft': { paramsTuple: [ParamValue,ParamValue]; params: {'item': ParamValue,'amount': ParamValue} }
    'utils.craft.items': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'bot.statistics': { paramsTuple?: []; params?: {} }
    'events.faction.quest': { paramsTuple?: []; params?: {} }
    'events.faction.on-your-marks': { paramsTuple?: []; params?: {} }
    'events.daily': { paramsTuple?: []; params?: {} }
    'leaderboard.global': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'leaderboard.trixium': { paramsTuple: [ParamValue]; params: {'category': ParamValue} }
    'link.discord.show': { paramsTuple: [ParamValue]; params: {'discordId': ParamValue} }
    'link.discord.index': { paramsTuple?: []; params?: {} }
    'link.minecraft.show': { paramsTuple: [ParamValue]; params: {'minecraftUUID': ParamValue} }
    'link.minecraft.index': { paramsTuple?: []; params?: {} }
    'update': { paramsTuple?: []; params?: {} }
    'giveaways.index': { paramsTuple?: []; params?: {} }
    'giveaways.active': { paramsTuple?: []; params?: {} }
    'giveaways.check': { paramsTuple?: []; params?: {} }
    'giveaways.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'giveaways.state': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'discordId': ParamValue} }
    'other.duplicates.index': { paramsTuple?: []; params?: {} }
    'paladium.seasons': { paramsTuple?: []; params?: {} }
    'status.database': { paramsTuple?: []; params?: {} }
    'status.paladium': { paramsTuple?: []; params?: {} }
    'players.index': { paramsTuple?: []; params?: {} }
    'players': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.clicker': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.flags': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.jobs': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.wrapped': { paramsTuple: [ParamValue]; params: {'username': ParamValue} }
    'players.views': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'factions': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'usage.statistics': { paramsTuple?: []; params?: {} }
    'role.index': { paramsTuple?: []; params?: {} }
    'role.show': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'utils.jobs.items': { paramsTuple?: []; params?: {} }
    'utils.jobs.levels': { paramsTuple?: []; params?: {} }
    'utils.pog.items': { paramsTuple?: []; params?: {} }
    'utils.clicker.buildings': { paramsTuple?: []; params?: {} }
    'utils.clicker.upgrades': { paramsTuple?: []; params?: {} }
    'utils.craft.craft': { paramsTuple: [ParamValue,ParamValue]; params: {'item': ParamValue,'amount': ParamValue} }
    'utils.craft.items': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'link.discord.remove': { paramsTuple: [ParamValue]; params: {'discordId': ParamValue} }
    'link.minecraft.remove': { paramsTuple: [ParamValue]; params: {'minecraftUUID': ParamValue} }
    'giveaways.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'role.delete': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'user.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.remove_roles': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'giveaways.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'role.update': { paramsTuple: [ParamValue]; params: {'name': ParamValue} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.add_roles': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}