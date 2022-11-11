import dotenv from 'dotenv';

const env = process.env.ENV;
console.log(`Starting up in ${env} mode.`);

dotenv.config({
  path: `.env.${env}`,
});

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_MASKED_URL = process.env.MONGODB_MASKED_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;

const PORT = process.env.PORT || '3001';
const CORS_ORIGINS = process.env.CORS_ORIGINS || 'http://localhost:3000';

export {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_MASKED_URL,
  MONGODB_NAME,
  PORT,
  CORS_ORIGINS,
};
