import { Router } from 'express';
import { getAllTracks, getTrack, createTrack, updateTrack, deleteTrack } from '../controllers/trackController.js';
import { trackValidator } from '../middlewares/validators.js';

const router = Router();

// Route: /api/v1/tracks
router
  .route('/')
  .get(getAllTracks)
  .post(trackValidator, createTrack);

// Route: /api/v1/tracks/:id
router
  .route('/:id')
  .get(getTrack)
  .put(trackValidator, updateTrack)
  .delete(deleteTrack);

export default router;