import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

const COLLECTION_NAME = 'categories';

export const findAllCategories = async () => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).find({}).toArray();
};

export const findCategoryById = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};