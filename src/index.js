
/**
 * Module dependencies.
 */

import sql from 'sql-tag';

/**
 * Export `sequelize-sql-tag`.
 */

export default function sqltag(...rest) {
  const { values: bind, text: query } = sql(...rest);

  return { bind, query };
}
