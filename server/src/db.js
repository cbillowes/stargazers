import { MongoClient } from 'mongodb';
import { MONGODB_NAME, MONGODB_URL } from './constants.js';

const url = MONGODB_URL;
const dbName = MONGODB_NAME;
const client = new MongoClient(url);

const closeConnection = () => {
  client.close();
  console.info(`Successfully closed MongoDB instance to ${url}`);
};

const openConnection = async () => {
  await client.connect();
  console.info(`Successfully connected to MongoDB instance at ${url}`);
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
