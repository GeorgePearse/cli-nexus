/**
 * Sessions routes
 */

import { Router } from 'express';
import * as sessionsController from '../controllers/sessionsController';

const router = Router();

router.get('/', sessionsController.getAllSessions);
router.get('/:id', sessionsController.getSessionById);
router.post('/', sessionsController.createSession);
router.patch('/:id', sessionsController.updateSession);
router.delete('/:id', sessionsController.deleteSession);

export default router;
