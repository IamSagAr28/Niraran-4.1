require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');

const sessionMiddleware = require('./session');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies from frontend
}));

app.use(express.json());

// Session Middleware
app.use(sessionMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/api', authRoutes); // Expose /api/me

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
