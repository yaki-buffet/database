import { relations } from 'drizzle-orm';
import { mysqlSchema, varchar } from 'drizzle-orm/mysql-core';

import { commonColumns } from '../common.js';

export const schema = mysqlSchema('usr');

export const user = schema.table('user', {
  ...commonColumns,
  externalId: varchar('external_id', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const userRelations = relations(user, () => ({}));
