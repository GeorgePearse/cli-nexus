/**
 * CLI Configurations routes
 */

import { Router } from 'express';
import * as cliConfigsController from '../controllers/cliConfigsController';

const router = Router();

router.get('/', cliConfigsController.getAllConfigs);
router.get('/:id', cliConfigsController.getConfigById);
router.post('/', cliConfigsController.createConfig);
router.patch('/:id', cliConfigsController.updateConfig);
router.delete('/:id', cliConfigsController.deleteConfig);

export default router;
