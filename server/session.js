const cookieSession = require('cookie-session');

const sessionMiddleware = cookieSession({
  name: 'nivaran_session',
  keys: [process.env.SESSION_KEY || 'secret_key_change_me'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  httpOnly: true, // Prevent JS access
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
});

module.exports = sessionMiddleware;
