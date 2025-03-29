import express from 'express';
import { Request, Response } from 'express';
import authRoutes from './auth.js';
import config from '../config/index.js';

const router = express.Router();

// Root route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Puppyporker API',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Health check route
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Puppyporker API is running' });
});

// API routes
router.use(`${config.apiPrefix}/auth`, authRoutes);

export default router;
