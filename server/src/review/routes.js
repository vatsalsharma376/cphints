import Router from 'express';
import {showHints} from './controller.js';
const router = Router();
router.get('/',showHints);
export default router;
