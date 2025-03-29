import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import config from './config/index.js';

// Initialize Express app
const app = express();
const port = config.port;

// Middleware
app.use(cors({
  origin: [
    'https://www.puppyporkr.com',
    'https://puppyporkr.com',
    'https://api.puppyporkr.com',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Use routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start the server if not running in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`🚀 PuppyPorkr API server running at http://localhost:${port}`);
    console.log(`🐶 Health check available at http://localhost:${port}/health`);
  });
}

export default app;
