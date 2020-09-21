import 'reflect-metadata'
import { initApp } from './app'

const PORT = process.env.PORT || 4000

initApp().then(
  (app) => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  },
  (err) => {
    console.error(`Failed to initialize the app`, err)
  },
)
