require('dotenv')

const config = {
  development: {
    dbConfig: {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'localdev',
      password: process.env.DB_PASSWORD,
      database: 'vcrpg',
    },
    redis: {
      password: process.env.REDIS_PASSWORD,
    },
    auth: {
      google: {
        secret: process.env.GOOGLE_SECRET,
      },
    },
  },
  production: {
    dbConfig: {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'localdev',
      password: process.env.DB_PASSWORD,
      database: 'vcrpg',
    },
    redis: {
      password: process.env.REDIS_PASSWORD,
    },
    auth: {
      google: {
        secret: process.env.GOOGLE_SECRET,
      },
    },
  },
}

function getConfigForEnv(env) {
  switch (env) {
    case 'production': {
      return config.production
    }
    default: {
      return config.development
    }
  }
}

module.exports = getConfigForEnv(process.env.NODE_ENV)
