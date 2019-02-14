module.exports = {
  apps: [
    {
      name: 'basic-auth-client',
      script: './server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/app_error.log',
      out_file: './logs/app.log',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
