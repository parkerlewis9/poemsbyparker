module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/poemsbyparker_dev',
    migrations: {
      directory: "./db/migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/poemsbyparker_test',
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      port: process.env.DB_PORT,
      database: process.env.DATABASE_URL + `?ssl=true`,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: "./db/migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};