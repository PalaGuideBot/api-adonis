import { DateTime } from 'luxon'

export function getSeasons() {
  return {
    'v10': {
      start: DateTime.fromMillis(1726869600000).startOf('day'),
      end: DateTime.fromSQL('2025-02-16').endOf('day'),
    },
    'v10.5': {
      start: DateTime.fromMillis(1740092400000).startOf('day'),
      end: DateTime.fromSQL('2025-07-06').endOf('day'),
    },
    'Summer Rush': {
      start: DateTime.fromMillis(1752336000000).startOf('day'),
      end: DateTime.fromSQL('2025-09-12').endOf('day'),
    },
    'Summer Rush | Course au Trixium': {
      start: DateTime.fromMillis(1757721600000).startOf('day'),
      end: DateTime.fromSQL('2025-10-31').endOf('day'),
    },
    'v11': {
      start: DateTime.fromMillis(1763751600000).startOf('day'),
      end: DateTime.now().endOf('day'),
    },
  }
}

export const CURRENT_SEASON = 'v11'
