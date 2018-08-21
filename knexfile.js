// Update with your config settings.

const path = require('path')

module.exports = {

  development: {
    client: 'pg',
    connection:  'postgres://localhost/imgurclone',
    migrations: {
        directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      filename: process.env.DATABASE_URL
    },
  }
};
