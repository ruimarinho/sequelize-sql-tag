
module.exports = function(Sequelize) {
  Sequelize.prototype.query = (function(fn) {
    return function() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }

      if (args[0].query && args[0].values) {
        var options = {};
        var callee = null;

        if (args.length === 3) {
          callee = args[1];
          options = args[2];
        } else if (args.length === 2) {
          if (!!args[1] && typeof args[1] === 'object' && args[1].constructor === Object) {
            options = args[1]
          } else {
            callee = args[1];
            options = {};
          }
        }

        options.replacements = args[0].values;

        return fn.call(this, args[0].query, callee, options);
      }

      return fn.apply(this, args);
    }
  })(Sequelize.prototype.query);
};
