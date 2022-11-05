import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'stargazers-db';
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
