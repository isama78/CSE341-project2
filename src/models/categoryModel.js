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

export const insertCategory = async (category) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).insertOne(category);
};

export const updateCategory = async (id, category) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: category });
};

export const deleteCategory = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};