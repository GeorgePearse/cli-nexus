/**
 * Messages routes
 */

import { Router } from 'express';
import * as messagesController from '../controllers/messagesController';

const router = Router();

router.get('/session/:sessionId', messagesController.getMessagesBySession);
router.post('/', messagesController.createMessage);

export default router;
