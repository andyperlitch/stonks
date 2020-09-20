import { Router } from 'express'

const router = Router()

// auth logout
router.get('/logout', (req, res) => {
  res.send('Logging out')
})

// auth with google
router.get('/google', (req, res) => {
  res.send('login with google')
})

export default router
