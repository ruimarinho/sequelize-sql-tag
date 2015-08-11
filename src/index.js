
/**
 * Export modified Sequelize prototype.
 */

export default function(Sequelize) {
  const version = 'set' in Sequelize.prototype ? 2 : 1;

  Sequelize.prototype.query = (function sequelizeSqlTag(fn) {
    return function query(...args) {
      if (!args[0].query || !args[0].values) {
        return fn.apply(this, args);
      }

      let options = {};
      let callee = null;

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
  }(Sequelize.prototype.query));
}
