import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditsRoutes from './routes/creditsRoutes.js';
import { stripeWebhook } from './controllers/webhooks.js';

const app = express();
await connectDB();
const PORT = process.env.PORT;

app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

// Middleware
// Allow Authorization header from the client (so browsers can send Bearer tokens)
app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credits', creditsRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});