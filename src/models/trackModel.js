import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

const COLLECTION_NAME = 'tracks';

/**
 * Fetches all tracks from the database
 */
export const findAllTracks = async () => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).find({}).toArray();
};

/**
 * Finds a single track by its hex string ID
 */
export const findTrackById = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
};

/**
 * Inserts a new track into the collection
 */
export const insertTrack = async (trackData) => {
  const db = getDB();
  // We add the timestamp here as a safety measure
  const newTrack = {
    ...trackData,
    createdAt: new Date()
  };
  return await db.collection(COLLECTION_NAME).insertOne(newTrack);
};

/**
 * Updates an existing track
 */
export const updateTrackById = async (id, updateData) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' } // Returns the modified document
  );
};

/**
 * Removes a track from the database
 */
export const deleteTrackById = async (id) => {
  const db = getDB();
  return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
};