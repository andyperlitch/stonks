import * as http from 'http'
import { Server, Socket } from 'socket.io'
import { registerSocketServer } from './stores/game'
import 'reflect-metadata'
import { initApp } from './app'

const PORT = process.env.PORT || 4000

initApp().then(
  (app) => {
    const server = http.createServer(app)
    const io = new Server(server)
    registerSocketServer(io)
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  },
  (err) => {
    console.error(`Failed to initialize the app`, err)
  },
)
