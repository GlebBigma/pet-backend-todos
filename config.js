const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  hostname: process.env.HOSTNAME || 'localhost',
  mongoURL: process.env.MONGO_URL || '',
};

if (!config.mongoURL) {
  console.error('❌ MONGO_URL is missing in environment variables');
  process.exit(1);
}

module.exports = config;
