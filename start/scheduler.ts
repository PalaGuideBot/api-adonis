import scheduler from 'adonisjs-scheduler/services/main'

import SyncPlayers from '#commands/sync_players'

scheduler.command(SyncPlayers).everyMinutes(5)
