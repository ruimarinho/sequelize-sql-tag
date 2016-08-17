
/**
 * Test `sequelize-sql-tag`.
 */

import Sequelize from 'sequelize';
import sql from '../src';

describe('sequelize-sql-tag', () => {
  describe('mysql', () => {
    let sequelize;
    let User;

    before(() => {
      sequelize = new Sequelize('mysql://root:root@mysql:3306/mysql', { dialect: 'mysql', logging: false });
      User = sequelize.define('User', { username: Sequelize.STRING });
    });

    it('should support a tagged sql query', () => {
      return sequelize.sync({ force: true })
        .then(() => User.create({ username: 'foo' }))
        .then(() => User.create({ username: 'bar' }))
        .then(() => sequelize.query(sql`SELECT * FROM Users WHERE username = ${'foo'}`))
        .then(results => {
          results.should.have.length(2);
          results[0].should.have.length(1);
          results[0][0].username.should.equal('foo');
        });
    });
  });

  describe('postgres', () => {
    let sequelize;
    let User;

    before(() => {
      sequelize = new Sequelize('postgres://postgres:@postgres:5432/postgres', { dialect: 'postgres', logging: false });
      User = sequelize.define('User', { username: Sequelize.STRING });
    });

    it('should support a tagged sql query', () => {
      return sequelize.sync({ force: true })
        .then(() => User.create({ username: 'foo' }))
        .then(() => User.create({ username: 'bar' }))
        .then(() => sequelize.query(sql`SELECT * FROM "Users" WHERE username = ${'foo'}`))
        .then(results => {
          results.should.have.length(2);
          results[0].should.have.length(1);
          results[0][0].username.should.equal('foo');
        })
        .then(() => sequelize.query(sql`SELECT * FROM "Users" WHERE username = ANY (${['foo', 'bar']})`))
        .then(results => {
          results.should.have.length(2);
          results[0].should.have.length(2);
          results[0][0].username.should.equal('foo');
          results[0][1].username.should.equal('bar');
        })
        .then(() => sequelize.query(sql`SELECT ${'1'}::int as foo`))
        .then(results => {
          results.should.have.length(2);
          results[0].should.have.length(1);
          results[0][0].foo.should.equal(1);
        });
    });
  });

  describe('sqlite', () => {
    let sequelize;
    let User;

    before(() => {
      sequelize = new Sequelize('sqlite', 'sqlite', 'sqlite', { dialect: 'sqlite', logging: false });
      User = sequelize.define('User', { username: Sequelize.STRING });
    });

    it('should support a tagged sql query', () => {
      return sequelize.sync({ force: true })
        .then(() => User.create({ username: 'foo' }))
        .then(() => sequelize.query(sql`SELECT * FROM "Users" WHERE username = ${'foo'}`))
        .then(results => {
          results.should.have.length(2);
          results[0].should.have.length(1);
          results[0][0].username.should.equal('foo');
        });
    });
  });
});
