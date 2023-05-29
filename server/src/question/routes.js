import Router from 'express';
import jwtAuth from "../middleware/jwtAuth.js";
import {showAllQuestions} from './controller.js';
const router = Router();
router.post('/',showAllQuestions);

export default router;
