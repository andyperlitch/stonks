import { AppConfig } from './../config'
import redis from 'redis'
import session from 'express-session'

let RedisStore = require('connect-redis')(session)

export const sessionMiddleware = (config: AppConfig) => {
  let redisClient = redis.createClient({
    host: 'redis',
  })

  return session({
    store: new RedisStore({ client: redisClient }),
    secret: config.session.cookieKey,
    resave: false,
  })
}
