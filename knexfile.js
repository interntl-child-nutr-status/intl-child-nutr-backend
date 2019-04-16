module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "build_week",
      user: 'nickcannariato'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./models/migrations/"
    },
    seeds: {
      directory: "./models/seeds/"
    },
    useNullAsDefault: true
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./models/migrations/"
    },
    seeds: {
      directory: "./models/seeds/"
    },
    useNullAsDefault: true
  }
};
