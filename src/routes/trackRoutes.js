import { Router } from 'express';
import { getAllTracks, getTrack, createTrack, updateTrack, deleteTrack } from '../controllers/trackController.js';
import { trackValidator, validateId } from '../middlewares/validators.js';

const router = Router();

// Route: /api/v1/tracks
router
  .route('/')
  .get(getAllTracks)
  .post(trackValidator, createTrack);

// Route: /api/v1/tracks/:id
router
  .route('/:id')
  .get(validateId, getTrack)
  .put(validateId, trackValidator, updateTrack)
  .delete(validateId, deleteTrack);

export default router;