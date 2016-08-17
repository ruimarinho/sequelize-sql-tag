'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sqltag;

var _sqlTag = require('sql-tag');

var _sqlTag2 = _interopRequireDefault(_sqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export `sequelize-sql-tag`.
 */

function sqltag() {
  var _sql = _sqlTag2.default.apply(undefined, arguments);

  const bind = _sql.values;
  const query = _sql.text;


  return { bind: bind, query: query };
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];