module.exports = {
    development: {
        database: {
            client: 'postgresql',
            connection: {
                database: 'razbordb',
                user: 'root',
                password: 'root',
                host: 'localhost',
                port: 5432,
            },
            migrations: {
                directory: './db/migrations',
            },
            seeds: {
                directory: './db/seeds',
            }
        }
    },
    jwtkey: 'Fjfksd'
};
  
    /*staging: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }*/
  
  