import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AuraSkin API Server',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - Users: http://localhost:${PORT}/api/users`);
  console.log(`   - Products: http://localhost:${PORT}/api/products`);
  console.log(`   - Health: http://localhost:${PORT}/api/health`);
});

