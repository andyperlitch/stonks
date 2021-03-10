import { Router } from 'express'
import passport from 'passport'

const router = Router()

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  console.log(`=========== redirect route from google hit ==============`)
  res.redirect('/home')
})

export default router
