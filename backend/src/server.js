// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wellwisher-ai-buddy';

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests, please try again later.' },
});

// ✅ Security middleware
app.use(helmet());
app.use(limiter);

// ✅ CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ Connect MongoDB
try {
  const conn = await mongoose.connect(MONGO_URI);
  console.log(`✅ MongoDB connected: ${conn.connection.host}`);
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
}

// ✅ Routes
app.use('/api/auth', authRoutes);        // Auth endpoints
app.use('/api/session', sessionRoutes);  // Session endpoints

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ✅ Default root
app.get('/', (req, res) => res.send('🚀 Wellwisher server is running'));

// ✅ 404 handler (fixed)
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`
  );
});

export default app;
