module.exports = {
  apps: [
    {
      name: 'api',
      script: 'bin/server.js',
      cwd: './build',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
    },
    {
      name: 'scheduler',
      script: 'ace.js',
      cwd: './build',
      args: ['scheduler:run'],
      exec_mode: 'cluster',
      instances: 'max',
    },
  ],
}
