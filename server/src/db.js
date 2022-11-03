import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'stargazers-db';
const client = new MongoClient(url);

const closeConnection = () => {
  client.close();
  console.info(`Successfully closed MongoDB instance to ${url}`);
};

const withCollection = async (name, executeQuery) => {
  try {
    await client.connect();
    console.info(`Successfully connected to MongoDB instance to ${url}`);
    const db = client.db(dbName);
    const collection = db.collection(name);
    return await executeQuery(collection);
  } catch (e) {
    console.error(e);
    closeConnection();
    throw new Error('An unhandled exception occurred.');
  }
};

export { withCollection };
