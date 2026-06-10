// Deprecated — database queries now use Drizzle ORM via server/utils/db.ts
export default function getDBPool() {
  throw new Error('getDBPool is deprecated. Use db from server/utils/db.ts instead.')
}
