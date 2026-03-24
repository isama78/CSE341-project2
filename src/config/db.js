import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error('Missing MongoDB configuration in .env file');
}

const client = new MongoClient(uri);

let dbInstance = null;

export const connectDB = async () => {
  try {
    await client.connect();
    dbInstance = client.db(dbName);
    console.log('Successfully connected to MongoDB database');
  } catch (error) {
    console.error('Critical error: Could not connect to MongoDB', error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return dbInstance;
};