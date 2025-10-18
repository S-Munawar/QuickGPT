import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { getPublishedImages } from '../controllers/messageController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserProfile);
userRouter.get('/published-images', getPublishedImages);


export default userRouter;