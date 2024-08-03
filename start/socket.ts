import app from '@adonisjs/core/services/app'

import { PM2Worker } from '#usage/services/pm2'

app.ready(async () => {
  const io = await app.container.make('socket')
  const pm2Worker = await app.container.make(PM2Worker)

  io.on('connection', (socket) => {
    if (io.sockets.sockets.size > 0) {
      pm2Worker.start()
    }

    socket.on('disconnect', () => {
      if (io.sockets.sockets.size === 0) {
        pm2Worker.stop()
      }
    })
  })

  io.on('disconnect', () => {
    pm2Worker.stop()
  })
})
