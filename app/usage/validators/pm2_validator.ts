import vine from '@vinejs/vine'

const pm2EnvValidator = vine.object({
  status: vine.enum(['online', 'stopping', 'stopped', 'launching', 'errored', 'one-launch-status']),
  created_at: vine.number(),
  pm_uptime: vine.number(),
})

export const processDescriptorValidator = vine.compile(
  vine.object({
    name: vine.string(),
    pid: vine.number(),
    pm2_env: pm2EnvValidator.clone(),
  })
)
