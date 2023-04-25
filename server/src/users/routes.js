import Router from 'express';
import {getUsers,addUser,loginUser,addTemporaryHint,addUserToDatabase} from './controller.js';
const router = Router();
router.get('/', getUsers);
router.post('/register',addUser);
router.post('/login',loginUser);
router.post('/hints',addTemporaryHint);
router.post('/register/verified',addUserToDatabase);

export default router;
