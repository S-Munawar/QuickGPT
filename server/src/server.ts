import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditsRoutes from './routes/creditsRoutes.js';
import { stripeWebhook } from './controllers/webhooks.js';
import bodyParser from 'body-parser';

const app = express();
await connectDB();
// Stripe webhook route first
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

// Then all other JSON middleware and routes
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
// Allow Authorization header from the client (so browsers can send Bearer tokens)
app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credits', creditsRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});