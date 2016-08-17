# sequelize-sql-tag

A template tag for writing elegant parameterized SQL queries based on [ES2015 tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) using [sequelize](https://github.com/sequelize/sequelize).

## Status

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

Install the package via `npm`:

```sh
npm install --save sequelize-sql-tag
```

## Compatibility

Due to the constant changes in `sequelize`, the usage of this module varies significantly.

Since versions `>=3.14.0` sequelize supports *parameterized queries*, i.e., queries that can be sent to the server separately from the arguments, which is a recommended form of protection against SQL injections. This requires installing [sequelize-sql-tag@2.0.0](https://github.com/seegno/sequelize-sql-tag/tree/v2.0.0) only as exemplified below.

From versions `>=2.0.4 <3.14.0`, sequelize only supports text queries, i.e., queries that are sent to the server in plain text and escaped by the client (or framework). Version [sql-tag@0.0.1](https://github.com/seegno/sql-tag/tree/v0.0.1) outputs a format that is directly compatible with sequelize without requiring any additional patching.

For versions `>=1.7.0 <2.0.4`, in addition to `sql-tag@0.0.1`, a patch is required to make sequelize understand text queries as output by `sql-tag`. This patch was made available on an earlier version of this module ([sequelize-sql-tag@1.0.0](https://github.com/seegno/sequelize-sql-tag/tree/v1.0.0)).

## Usage

```js
const Sequelize = require('sequelize');
const sql = require('./dist/src/index.js');
const sequelize = new Sequelize('sqlite', 'sqlite', 'sqlite', { dialect: 'sqlite', logging: false });

sequelize.query(sql`SELECT ${1 + 1} as foo`).then(console.log);
// => [ [ { foo: 2 } ], Statement { sql: 'SELECT $1 as foo' } ]
```

## Tests

```sh
npm test
```

## Release

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/sequelize-sql-tag.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/sequelize-sql-tag
[travis-image]: https://img.shields.io/travis/seegno/sequelize-sql-tag/v2.0.0.svg?style=flat-square
[travis-url]: https://travis-ci.org/seegno/sequelize-sql-tag
