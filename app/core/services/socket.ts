import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'

let socket: Server

app.ready(async () => {
  socket = await app.container.make('socket')
})

export { socket as default }
