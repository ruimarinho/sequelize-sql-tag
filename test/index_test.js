
/**
 * Test `sequelize-sql-tag`.
 */

var Sequelize = require('sequelize');

require('..')(Sequelize);

describe('sequelize-sql-tag', function() {
  var sequelize;
  var User;

  beforeEach(function() {
    sequelize = new Sequelize('database', 'username', 'password', { dialect: 'sqlite', logging: false });

    User = sequelize.define('User', {
      username: Sequelize.STRING
    });
  });

  describe('normal sql queries', function() {
    it('should continue supporting an sql query', function() {
      return sequelize.sync().then(function() {
        return User.create({
          username: 'foo'
        });
      }).then(function() {
        return sequelize.query('SELECT * FROM "Users" WHERE username = ?', {
          replacements: ['foo'],
          type: sequelize.QueryTypes.SELECT
        });
      }).then(function(results) {
        results.should.have.length(1);
        results[0].username.should.equal('foo');
      });
    });
  });

  describe('tagged sql queries', function() {
    it('should support a tagged sql query', function() {
      return sequelize.sync().then(function() {
        return User.create({
          username: 'foo'
        });
      }).then(function() {
        return sequelize.query({
          query: 'SELECT * FROM "Users" WHERE username = ?',
          values: ['foo']
        }, {
          type: sequelize.QueryTypes.SELECT
        });
      }).then(function(results) {
        results.should.have.length(1);
        results[0].username.should.equal('foo');
      });
    });
  });
});
