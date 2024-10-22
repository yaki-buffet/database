import { StApiName } from '@st-api/core';
import { Logger } from '@st-api/firebase';
import type { Pool } from 'mysql2';
import type { Class } from 'type-fest';

import { allSchemas } from './all-schemas.js';
import { DATABASE_CONNECTION_STRING } from './database-connection-string.secret.js';
import { getClient } from './database.js';
import { FactoryProvider, InjectionToken, Provider } from '@stlmpp/di';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';

function getClazz<T>(): Class<T> {
  return class {} as Class<T>;
}

export class Drizzle extends getClazz<MySql2Database<typeof allSchemas>>() {}

const InternalClientToken = new InjectionToken<Pool>(
  'DRIZZLE_INTERNAL_CLIENT_TOKEN',
);

const DrizzleLogger = Logger.create('drizzle');

export function provideDrizzle(): Provider[] {
  return [
    new FactoryProvider(
      InternalClientToken,
      (apiName) =>
        getClient({
          connectionString: DATABASE_CONNECTION_STRING.value(),
          applicationName: apiName,
        }),
      [StApiName],
    ),
    new FactoryProvider(
      Drizzle,
      (client) =>
        drizzle({
          client,
          schema: allSchemas,
          mode: 'default',
          logger: {
            logQuery: (query, params) =>
              DrizzleLogger.debug(`${query}; -- ${JSON.stringify(params)}`),
          },
        }),
      [InternalClientToken],
    ),
  ];
}
