import Router from 'express';
import {addTemporaryHint} from './controller.js';
import jwtAuth from "../middleware/jwtAuth.js";
const router = Router();
router.post('/',jwtAuth,addTemporaryHint);
export default router;
