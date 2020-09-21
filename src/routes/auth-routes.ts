import { Router } from 'express'
import jwt from 'jwt-simple'

const router = Router()

router.post('/user', (req, res) => {
  console.log('FUUUUUUCK', req.token)
  res.json({
    success: true,
  })
  // if (!req.token) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'No token found in Authorization header',
  //   })
  // }
  // console.log(`req.token`, req.token)
  // try {
  //   const decoded = jwt.decode(req.token as string, 'F9qU7M-gueNrGVUIW8jbAuku')
  //   console.log(`decoded`, decoded)
  //   res.json({
  //     success: true,
  //   })
  // } catch (e) {
  //   console.error('Error decoding jwt', e)
  //   res.status(500).json({
  //     success: false,
  //     message: 'Error decoding jwt',
  //   })
  // }
})

export default router
