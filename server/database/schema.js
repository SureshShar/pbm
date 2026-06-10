import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'

export const usersPageData = sqliteTable('users_page_data', {
  pageId:        text('page_id').primaryKey(),
  userPassword:  text('user_password').notNull(),
  userName:      text('user_name').notNull(),
  emailId:       text('email_id'),
  contactNumber: text('contact_number'),
  telegramId:    text('telegram_id'),
  userAvailable: text('user_available'),
  pageLayout:    text('page_layout'),
  userQuery:     text('user_query', { mode: 'json' }).$type(),
  userAssets:    text('user_assets', { mode: 'json' }).$type(),
  pageData:      text('page_data', { mode: 'json' }).$type(),
  stars:         integer('stars').default(1),
  karma:         integer('karma').default(1),
  createdAt:     integer('created_at').notNull(),
  updatedAt:     integer('updated_at'),
  lastLoginAt:   integer('last_login_at'),
  isActive:      integer('is_active', { mode: 'boolean' }).default(true),
  topupStartAt:  integer('topup_start_at'),
  topupEndAt:    integer('topup_end_at'),
}, (table) => [
  index('idx_username_password').on(table.userName, table.userPassword),
])
