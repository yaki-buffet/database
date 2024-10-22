import mysql, { type Pool } from 'mysql2';

const CONNECTION_TIMEOUT_MS =
  Number(process.env.DB_CONNECTION_TIMEOUT) || 10 * 1000;
const IDLE_TIMEOUT_MS =
  Number(process.env.DB_CONNECTION_IDLE_TIMEOUT) || 10 * 1000;

interface GetClientOptions {
  connectionString: string;
  applicationName?: string;
}

export function getClient(options: GetClientOptions): Pool {
  return mysql.createPool({
    uri: options.connectionString,
    idleTimeout: IDLE_TIMEOUT_MS,
    connectTimeout: CONNECTION_TIMEOUT_MS,
  });
}
