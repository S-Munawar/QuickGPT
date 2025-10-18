import express from 'express';
import { protect } from '../middleware/auth.js';
import { createChat, getChats, getChat, deleteChat } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get('/create', protect, createChat);
chatRouter.get('/gets', protect, getChats);
chatRouter.get('/get', protect, getChat);
chatRouter.delete('/delete', protect, deleteChat);


export default chatRouter;



