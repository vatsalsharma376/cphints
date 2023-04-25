import Router from 'express';
import {addTemporaryHint,upvoteHint,downvoteHint} from './controller.js';
import jwtAuth from "../middleware/jwtAuth.js";
const router = Router();
router.post('/',jwtAuth,addTemporaryHint);
router.post('/upvote',jwtAuth,upvoteHint);
router.post('/downvote',jwtAuth,downvoteHint);
export default router;
