
/**
 * Test `sequelize-sql-tag`.
 */

import Sequelize from 'sequelize';
import tag from '../src';

tag(Sequelize);

describe('sequelize-sql-tag', () => {
  describe.skip('sequelize v1.7.x', () => {
    let sequelize;
    let User;

    beforeEach(() => {
      sequelize = new Sequelize('database', 'username', 'password', { dialect: 'sqlite', logging: false });

      User = sequelize.define('User', { username: Sequelize.STRING });
    });

    describe('normal sql queries', () => {
      it('should continue supporting an sql `query` with `callee`, `options` and `replacements`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query('SELECT * FROM "Users" WHERE username = ?', User, { type: 'SELECT' }, ['foo']);
        }).then((results) => {
          results.should.have.length(1);
          results[0].should.be.an.instanceOf(User.DAO);
          results[0].username.should.equal('foo');
        });
      });
    });

    describe('tagged sql queries', () => {
      it('should support a tagged sql query with `callee`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query({ query: 'SELECT * FROM "Users" WHERE username = ?', values: ['foo'] }, User, { type: 'SELECT' });
        }).then((results) => {
          results.should.have.length(1);
          results[0].should.be.an.instanceOf(User.DAO);
          results[0].username.should.equal('foo');
        });
      });

      it('should support a tagged sql query without `callee` but with `options`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query({ query: 'SELECT * FROM "Users" WHERE username = ?', values: ['foo'] }, { type: 'SELECT', raw: true });
        }).then((results) => {
          results.should.have.length(1);
          results[0].username.should.equal('foo');
        });
      });
    });
  });

  describe('sequelize v2.x', () => {
    let sequelize;
    let User;

    beforeEach(() => {
      sequelize = new Sequelize('database', 'username', 'password', { dialect: 'sqlite', logging: false });

      User = sequelize.define('User', { username: Sequelize.STRING });
    });

    describe('normal sql queries', () => {
      it('should continue supporting an sql `query` with `callee` and `options`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query('SELECT * FROM "Users" WHERE username = ?', User, { replacements: ['foo'], type: sequelize.QueryTypes.SELECT });
        }).then((results) => {
          results.should.have.length(1);
          results[0].should.be.an.instanceOf(User.DAO);
          results[0].username.should.equal('foo');
        });
      });

      it('should continue supporting an sql `query` without `callee` but with `options`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query('SELECT * FROM "Users" WHERE username = ?', { replacements: ['foo'], type: sequelize.QueryTypes.SELECT });
        }).then((results) => {
          results.should.have.length(1);
          results[0].username.should.equal('foo');
        });
      });
    });

    describe('tagged sql queries', () => {
      it('should support a tagged sql query with `callee`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query({ query: 'SELECT * FROM "Users" WHERE username = ?', values: ['foo'] }, User, { type: sequelize.QueryTypes.SELECT });
        }).then((results) => {
          results.should.have.length(1);
          results[0].should.be.an.instanceOf(User.DAO);
          results[0].username.should.equal('foo');
        });
      });

      it('should support a tagged sql query without `callee` but with `options`', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query({ query: 'SELECT * FROM "Users" WHERE username = ?', values: ['foo'] }, { type: sequelize.QueryTypes.SELECT });
        }).then((results) => {
          results.should.have.length(1);
          results[0].username.should.equal('foo');
        });
      });

      it('should support a tagged sql query with `callee` only', () => {
        return sequelize.sync().then(() => {
          return User.create({ username: 'foo' });
        }).then(() => {
          return sequelize.query({ query: 'SELECT * FROM "Users" WHERE username = ?', values: ['foo'] }, User);
        }).then((results) => {
          results.should.have.length(2);
          results[0].should.have.length(1);
          results[0][0].username.should.equal('foo');
        });
      });
    });
  });
});
