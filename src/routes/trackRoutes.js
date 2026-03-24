import { Router } from 'express';
import { getAllTracks, getTrack, createTrack, updateTrack, deleteTrack } from '../controllers/trackController.js';
import { trackValidator, validateId } from '../middlewares/validators.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router
  .route('/')
  .get(getAllTracks)
  .post(isAuthenticated, trackValidator, createTrack);

router
  .route('/:id')
  .get(validateId, getTrack)
  .put(isAuthenticated, validateId, trackValidator, updateTrack)
  .delete(isAuthenticated, validateId, deleteTrack);

export default router;