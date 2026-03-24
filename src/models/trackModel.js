import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

const COLLECTION_NAME = 'tracks';

export const findAllTracks = async () => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).find({}).toArray();
};

export const findTrackById = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};

export const insertTrack = async (trackData) => {
  const db = getDB();
  const newTrack = {
    ...trackData,
    createdAt: new Date()
  };
  return await db.collection(COLLECTION_NAME).insertOne(newTrack);
};

export const updateTrackById = async (id, updateData) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' } // Returns the modified document
  );
};

export const deleteTrackById = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};