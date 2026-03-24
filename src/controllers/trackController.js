import { findAllTracks, findTrackById, insertTrack, updateTrackById, deleteTrackById } from '../models/trackModel.js';
import AppError from '../utils/AppError.js';

export const getAllTracks = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Get all audio tracks'
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

export const getTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Get a track by ID'
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

export const createTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Create a new track'
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

export const updateTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Update an existing track'
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

export const deleteTrack = async (req, res, next) => {
  // #swagger.tags = ['Tracks']
  // #swagger.summary = 'Delete a track'
  try {
    const result = await deleteTrackById(req.params.id);
    if (result.deletedCount === 0) {
      return next(new AppError('No track found with that ID', 404));
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};