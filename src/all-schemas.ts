import { getDrizzleSchema } from './common.js';
import { usr } from './schema/index.js';

export const allSchemas = {
  ...getDrizzleSchema(usr, 'usr'),
};
