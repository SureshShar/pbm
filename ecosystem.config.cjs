module.exports = {
  apps: [
    {
      name: 'page_by_me',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: '.output/server/index.mjs',
    },
  ],
}