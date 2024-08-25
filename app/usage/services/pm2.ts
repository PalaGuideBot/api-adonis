import { DateTime } from 'luxon'
import pidusage from 'pidusage'
import pm2, { type ProcessDescription } from 'pm2'

import socket from '#core/services/socket'
import { processDescriptorValidator } from '#usage/validators/pm2_validator'

async function connect() {
  return new Promise<void>((resolve, reject) => {
    pm2.connect((error) => {
      if (error) {
        return reject(error)
      }
      resolve()
    })
  })
}

async function listProcesses() {
  await connect()
  return new Promise<ProcessDescription[]>((resolve, reject) => {
    pm2.list((error, list) => {
      if (error) {
        return reject(error)
      }
      resolve(list)
    })
  })
}

async function parseMetrics(process: ProcessDescription) {
  const [invalid, parsedProcess] = await processDescriptorValidator.tryValidate(process)

  if (invalid) {
    throw new Error('Invalid process descriptor')
  }

  let stats = await pidusage(parsedProcess.pid)

  return {
    name: parsedProcess.name,
    pid: parsedProcess.pid,
    memory: parsedProcess.pid !== 0 ? stats.memory / 1024 / 1024 : 0,
    cpu: parsedProcess.pid !== 0 ? stats.cpu.toFixed(2) : Number(0).toFixed(2),
    status: parsedProcess.pm2_env.status,
    created_at: parsedProcess.pm2_env.created_at,
    uptime: parsedProcess.pm2_env.pm_uptime,
  }
}

async function sendMetrics() {
  const now = DateTime.now().toISO()
  const processes = await listProcesses()
  const metrics = await Promise.all(processes.map(parseMetrics))
  socket.emit(
    'usage:metrics',
    metrics.map((metric) => ({ ...metric, date: now }))
  )
  pm2.disconnect()
}

class PM2Worker {
  private intervalId: NodeJS.Timeout | null = null
  private interval = 5000

  start() {
    if (this.intervalId) {
      return
    }
    this.intervalId = setInterval(() => {
      sendMetrics()
    }, this.interval)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

export { listProcesses, parseMetrics, PM2Worker, sendMetrics }
