
module.exports = function(Sequelize) {
  Sequelize.prototype.query = (function(fn) {
    return function() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }

      if (args[0].query && args[0].values) {
        var options = args[1] || {};

        options.replacements = args[0].values;

        return fn.call(this, args[0].query, options);
      }

      return fn.apply(this, args);
    };
  })(Sequelize.prototype.query);
};
