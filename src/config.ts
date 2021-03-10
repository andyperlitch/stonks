require('dotenv').config()

const devConfig = {
  hostName: 'http://localhost:3000',
  dbConfig: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'localdev',
    // ensures that the inferred type is string, not string | undefined
    password: process.env.DB_PASSWORD || '',
    database: 'stonks',
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

const prodConfig = {
  hostName: 'https://stonksgame.xyz',
  dbConfig: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'localdev',
    // ensures that the inferred type is string, not string | undefined
    password: process.env.DB_PASSWORD || '',
    database: 'stonks',
    entities: ['build/entity/**/*.js'],
    migrations: ['build/migration/**/*.js'],
    subscribers: ['build/subscriber/**/*.js'],
  },
  redis: {
    password: process.env.REDIS_PASSWORD || '',
  },
  auth: {
    google: {
      client: process.env.GOOGLE_CLIENT_ID || '',
      secret: process.env.GOOGLE_SECRET || '',
    },
  },
  session: {
    cookieKey: 'got any good sassaparilla?',
  },
}

export const getAppConfig = () =>
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig

export type AppConfig = ReturnType<typeof getAppConfig>
