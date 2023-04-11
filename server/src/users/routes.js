import Router from 'express';
import {getUsers,addUser,loginUser,addTemporaryHint} from './controller.js';
const router = Router();
router.get('/', getUsers);
router.post('/register',addUser);
router.post('/login',loginUser);
router.post('/hints',addTemporaryHint);
export default router;
