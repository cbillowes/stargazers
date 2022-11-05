import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;
const ENABLE_CORS_FOR_ORIGIN = process.env.ENABLE_CORS_FOR_ORIGIN;

export { PORT, MONGODB_URL, MONGODB_NAME, ENABLE_CORS_FOR_ORIGIN };
