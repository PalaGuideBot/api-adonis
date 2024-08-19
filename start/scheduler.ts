import scheduler from 'adonisjs-scheduler/services/main'

import SyncPlayers from '#commands/sync_players'
import SyncLeaderboard from '#commands/sync_leaderboard'
import SyncStatus from '#commands/sync_status'
import SyncLink from '#commands/sync_link'
import SyncRetry from '#commands/sync_retry'
import SyncFactions from '#commands/sync_factions'

scheduler.command(SyncPlayers).everyMinutes(5)
scheduler.command(SyncFactions).cron('*/5 12-23 * * *')
scheduler.command(SyncLeaderboard).cron('*/5 2-23 * * *')
scheduler.command(SyncLink).everyMinutes(5)
scheduler.command(SyncStatus).everyMinutes(10)
scheduler.command(SyncRetry).daily()
