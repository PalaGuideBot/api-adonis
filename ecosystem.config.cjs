module.exports = {
  apps: [
    {
      name: 'api',
      script: './build/bin/server.js',
    },
    {
      name: 'scheduler',
      script: './build/ace.js',
      args: 'scheduler:run',
    },
  ],
}
