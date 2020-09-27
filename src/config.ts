require('dotenv').config()

const config = {
  dbConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'localdev',
    // ensures that the inferred type is string, not string | undefined
    password: process.env.DB_PASSWORD || '',
    database: 'vcrpg',
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  },
  redis: {
    password: process.env.REDIS_PASSWORD || '',
  },
  auth: {
    google: {
      client:
        '991021471135-t2j25if3lpp8ji5691ufqje5ogt3l3ok.apps.googleusercontent.com',
      secret: process.env.GOOGLE_SECRET || '',
    },
  },
  session: {
    cookieKey: 'got any good sassaparilla?',
  },
}

export const getAppConfig = () => config
