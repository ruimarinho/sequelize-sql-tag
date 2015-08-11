
/**
 * Export modified Sequelize prototype.
 */

'use strict';

exports.__esModule = true;

exports['default'] = function (Sequelize) {
  var version = 'set' in Sequelize.prototype ? 2 : 1;

  Sequelize.prototype.query = (function sequelizeSqlTag(fn) {
    return function query() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!args[0].query || !args[0].values) {
        return fn.apply(this, args);
      }

      var options = {};
      var callee = null;

      if (args.length === 3) {
        callee = args[1];
        options = args[2];
      } else if (args.length === 2) {
        if (!!args[1] && typeof args[1] === 'object' && args[1].constructor === Object) {
          options = args[1];
        } else {
          callee = args[1];
          options = {};
        }
      }

      if (version === 2) {
        options.replacements = args[0].values;

        return fn.call(this, args[0].query, callee, options);
      }

      return fn.call(this, args[0].query, callee, options, args[0].values);
    };
  })(Sequelize.prototype.query);
};

module.exports = exports['default'];