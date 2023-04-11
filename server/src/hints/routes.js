import Router from 'express';
import {addTemporaryHint} from './controller.js';
const router = Router();
router.post('/',addTemporaryHint);
export default router;
