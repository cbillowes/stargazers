import { MongoClient } from 'mongodb';
import {
  MONGODB_NAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_MASKED_URL,
} from './constants.js';

const maskedUrl = MONGODB_MASKED_URL;
const url = maskedUrl
  .replace('<username>', MONGODB_USERNAME)
  .replace('<password>', MONGODB_PASSWORD);
const dbName = MONGODB_NAME;
const client = new MongoClient(url);

const closeConnection = () => {
  client.close();
  console.info(`Successfully closed MongoDB instance to ${maskedUrl}`);
};

const openConnection = async () => {
  await client.connect();
  console.info(`Successfully connected to MongoDB instance at ${maskedUrl}`);
};

const withCollection = async (name, executeQuery) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(name);
    return await executeQuery(collection);
  } catch (e) {
    closeConnection();
    throw e;
  }
};

export { openConnection, closeConnection, withCollection };
