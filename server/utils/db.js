import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { dirname, resolve } from 'path'
import { mkdirSync } from 'fs'
import * as schema from '../database/schema'

// Re-export Drizzle helpers so they are Nitro auto-imported in all server files
export { eq, and, or, sql, asc, desc, count } from 'drizzle-orm'
export { usersPageData } from '../database/schema'

const dbPath = process.env.DATABASE_URL ?? resolve(process.cwd(), 'data/pbm.db')
mkdirSync(dirname(dbPath), { recursive: true })

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

// Create table on first run — idempotent, safe to call every startup
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users_page_data (
    page_id        TEXT PRIMARY KEY,
    user_password  TEXT NOT NULL,
    user_name      TEXT NOT NULL,
    email_id       TEXT,
    contact_number TEXT,
    telegram_id    TEXT,
    user_available TEXT,
    page_layout    TEXT,
    user_query     TEXT,
    user_assets    TEXT,
    page_data      TEXT,
    stars          INTEGER DEFAULT 1,
    karma          INTEGER DEFAULT 1,
    created_at     INTEGER NOT NULL,
    updated_at     INTEGER,
    last_login_at  INTEGER,
    is_active      INTEGER DEFAULT 1,
    topup_start_at INTEGER,
    topup_end_at   INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_username_password ON users_page_data (user_name, user_password);
`)

export const db = drizzle(sqlite, { schema })
