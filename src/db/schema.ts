import { randomUUID } from 'node:crypto';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: text('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
	activated: int({ mode: 'boolean' }).default(false),
});
