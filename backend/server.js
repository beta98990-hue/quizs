require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB (graceful fallback if not available)
connectDB();

// Security middleware (relaxed for local file serving)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// CORS
app.use(cors({ origin: '*', credentials: true }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─── API Routes ───────────────────────────────────────────────
app.use('/api', require('./routes/api'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Serve Frontend Static Files ──────────────────────────────
// Serve the quiz root directory (parent of backend)
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// Serve backend/data for JSON fallback (questions)
app.use('/backend', express.static(__dirname));

// SPA fallback — serve index.html for unknown routes
app.get('*', (req, res) => {
  const indexFile = path.join(frontendPath, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: 'Not found' });
    }
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║       🚀 DevQuiz Server Running        ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  Port    : http://localhost:${PORT}      ║`);
  console.log(`║  API     : http://localhost:${PORT}/api  ║`);
  console.log(`║  Mode    : ${(process.env.NODE_ENV || 'development').padEnd(28)}║`);
  console.log('╚════════════════════════════════════════╝\n');
  console.log('📂 Frontend: http://localhost:' + PORT);
  console.log('📡 API Docs: http://localhost:' + PORT + '/api/technologies\n');
});

module.exports = app;
