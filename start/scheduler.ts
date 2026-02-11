import scheduler from 'adonisjs-scheduler/services/main'

import SyncFactions from '#commands/sync_factions'
import SyncLeaderboard from '#commands/sync_leaderboard'
import SyncLink from '#commands/sync_link'
import SyncPlayers from '#commands/sync_players'
/* import SyncPlayersWrapped from '#commands/sync_players_wrapped' */
import PalaRefreshUUID from '#commands/pala_refresh_uuid'
import SyncDuplicatePlayerDate from '#commands/sync_duplicate_date_player'
import SyncDuplicatePlayer from '#commands/sync_duplicate_player'
import SyncRetry from '#commands/sync_retry'
import SyncStatus from '#commands/sync_status'

scheduler.command(SyncPlayers).everyMinutes(5)
/* scheduler.command(SyncPlayersWrapped).everyMinutes(5) */
scheduler.command(SyncLeaderboard).cron('*/5 2-23 * * *')
scheduler.command(SyncLink).everyMinutes(5)
scheduler.command(SyncStatus).everyMinutes(5)
scheduler.command(SyncRetry).daily()
scheduler.command(SyncFactions).everyMinutes(5)
scheduler.command(PalaRefreshUUID).everyHours(1)
scheduler.command(SyncDuplicatePlayer).cron('30 5 * * *')
scheduler.command(SyncDuplicatePlayerDate).cron('30 5 * * *')
