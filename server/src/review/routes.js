import Router from 'express';
import {approveHint, rejectHint, showHints} from './controller.js';
const router = Router();
router.get('/',showHints);
router.delete('/:id',rejectHint);
router.post('/',approveHint);
export default router;
