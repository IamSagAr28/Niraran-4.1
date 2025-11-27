require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');
const webhookRoutes = require('./webhooks');
const adminRoutes = require('./admin');
const sessionMiddleware = require('./session');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies from frontend
}));

// Webhooks need to be mounted before body parser if we want raw body, 
// but our webhook handler currently uses req.body. 
// For better signature verification, we should use raw body, but let's stick to the current plan for simplicity unless requested.
app.use(express.json());

// Session Middleware
app.use(sessionMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', authRoutes); // Expose /api/me
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
    console.log(`👉 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  });
}

module.exports = app;
