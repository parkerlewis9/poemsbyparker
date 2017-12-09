module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/poemsbyparker_dev',
    migrations: {
      directory: "./migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
          min: 2,
          max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
