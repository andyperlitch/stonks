import passport from 'passport'
import expressSession from 'express-session'
import { getManager, getRepository } from 'typeorm'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import cookieSession from 'cookie-session'
import { getAppConfig } from './config'
import { User } from './entity/User'
import { Express } from 'express'

export function setupAuth(app: Express) {
  const config = getAppConfig()

  passport.serializeUser((user: User, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id: string, done) => {
    getManager()
      .findOne(User, id)
      .then((user) => done(undefined, user))
      .catch((e) => done(e))
  })

  passport.use(
    new GoogleStrategy(
      {
        // options for google strategy
        clientID: config.auth.google.client,
        clientSecret: config.auth.google.secret,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        // weird typing issue
        // const profile: GoogleProfile = (_profile as unknown) as any
        try {
          const userRepo = getRepository(User)
          // check if user already exists in our own db
          const currentUser = await userRepo.findOne({ googleId: profile.id })
          if (currentUser) {
            // already have this user
            return done(undefined, currentUser)
          } else {
            // if not, create user in our db
            const newUser = userRepo.create({
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile?._json?.picture || '',
              email: profile?.emails?.length
                ? profile.emails[0].value
                : undefined,
            })
            await userRepo.save(newUser)
            return done(undefined, newUser)
          }
        } catch (e) {
          // LOG:WARN
          console.warn(`Failed to handle response from google`, e)
          done(e)
        }
      },
    ),
  )

  // set up session cookies
  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [config.session.cookieKey],
    }),
  )
  app.use(expressSession({ secret: config.session.cookieKey }))

  // initialize passport
  app.use(passport.initialize())
  app.use(passport.session())
}
