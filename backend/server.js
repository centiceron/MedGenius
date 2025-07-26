const express = require('express');
const cors = require('cors');
const path = require('path');
const n8nRoutes = require('./routes/n8n');

// Import routes
const medicineRoutes = require('./routes/medicines');
const scanRoutes = require('./routes/scans');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/n8n', n8nRoutes);
app.use('/', n8nRoutes);

// ✅ Frontend route
app.get('/', (req, res) => {
  res.render('index', { error: null, result: null });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MedGenius API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MedGenius API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Medicine search: http://localhost:${PORT}/api/medicines/search`);
});

module.exports = app;