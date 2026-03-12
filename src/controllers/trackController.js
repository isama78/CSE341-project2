import { findAllTracks, findTrackById, insertTrack, updateTrackById, deleteTrackById } from '../models/trackModel.js';
import AppError from '../utils/AppError.js';

// GET all tracks
export const getAllTracks = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Get all audio tracks'
  // #swagger.description = 'Retrieves a list of all audio tracks in the database.'
  try {
    const tracks = await findAllTracks();
    res.status(200).json({
      status: 'success',
      results: tracks.length,
      data: tracks
    });
  } catch (error) {
    next(error);
  }
};

// GET single track
export const getTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Get a track by ID'
  /* #swagger.parameters['id'] = { description: 'Track ID' } */
  try {
    const track = await findTrackById(req.params.id);
    if (!track) {
      return next(new AppError('No track found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: track });
  } catch (error) {
    next(error);
  }
};

// POST create track
export const createTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Create a new track'
  /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Track data',
        schema: { $ref: '#/definitions/Track' }
  } */
  try {
    const result = await insertTrack(req.body);
    res.status(201).json({
      status: 'success',
      data: { id: result.insertedId, ...req.body }
    });
  } catch (error) {
    next(error);
  }
};

// PUT update track
export const updateTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Update an existing track'
  /* #swagger.parameters['id'] = { description: 'Track ID' }
     #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Updated track data',
        schema: { $ref: '#/definitions/Track' }
  } */
  try {
    const track = await updateTrackById(req.params.id, req.body);
    if (!track) {
      return next(new AppError('No track found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: track });
  } catch (error) {
    next(error);
  }
};

// DELETE track
export const deleteTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Delete a track'
  /* #swagger.parameters['id'] = { description: 'Track ID' } */
  try {
    const result = await deleteTrackById(req.params.id);
    if (result.deletedCount === 0) {
      return next(new AppError('No track found with that ID', 404));
    }
    // 204 means "No Content" - standard for successful deletes
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};