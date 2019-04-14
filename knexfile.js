require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB,
      user: process.env.DEV_DB_USER,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './models/migrations/'
    },
    seeds: {
      directory: './models/seeds/'
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PROD_DB,
      user: process.env.PROD_USER,
      password: process.env.PROD_PW,
    }
  }
};
