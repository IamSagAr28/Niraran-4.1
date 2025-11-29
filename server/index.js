const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./auth');
const webhookRoutes = require('./webhooks');
const adminRoutes = require('./admin');
const sessionMiddleware = require('./session');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://nivaran31-h5u5ip9ru-vidyasagars-projects-414a8af3.vercel.app',
  'https://nivaran31-awqiwe0kv-vidyasagars-projects-414a8af3.vercel.app',
  'https://nivaran31.vercel.app',
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => origin.includes(allowed) || allowed.includes(origin));

    if (isAllowed || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Temporarily allow all for debugging if needed
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Security headers - Fix for CSP issues
app.use((req, res, next) => {
  // Remove restrictive CSP that's blocking resources
  res.removeHeader('Content-Security-Policy');

  // Set a very permissive CSP for production to ensure Google Auth and other scripts work
  res.setHeader(
    'Content-Security-Policy',
    "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; " +
    "script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; " +
    "connect-src * data: blob: 'unsafe-inline'; " +
    "img-src * data: blob: 'unsafe-inline'; " +
    "frame-src * data: blob:; " +
    "style-src * data: blob: 'unsafe-inline';"
  );

  // Add permissive headers for production
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Allow fonts and scripts from any source for now to fix the specific errors
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

// Webhooks need to be mounted before body parser if we want raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }));

// Use JSON parser for all other API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(sessionMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', authRoutes); // Expose /api/me
app.use('/api/auth', authRoutes); // Expose /api/auth/google/callback for Google OAuth
app.use('/api/webhooks', webhookRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Nivaran Auth Server is running.');
});

// Start Server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`👉 Client URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}

module.exports = app;
