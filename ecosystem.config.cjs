module.exports = {
  apps: [
    {
      name: 'api',
      script: './bin/server.js',
    },
    {
      name: 'scheduler',
      script: './ace.js',
      args: 'scheduler:run',
    },
  ],
}
