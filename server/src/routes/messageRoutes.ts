import express from 'express';
import { protect } from '../middleware/auth.js';
import { sendImageMessage, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.post('/text', protect, sendMessage);
messageRouter.post('/image', protect, sendImageMessage);

export default messageRouter;