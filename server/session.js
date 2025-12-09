const cookieSession = require('cookie-session');

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_KEY) {
  throw new Error('SESSION_KEY must be set in production for secure sessions');
}

const sessionMiddleware = cookieSession({
  name: 'nivaran_session',
  keys: [process.env.SESSION_KEY || 'secret_key_change_me'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: false, // Allow non-HTTPS in development
  httpOnly: false, // Allow JS access for debugging
  sameSite: 'lax', // More permissive for local development
});

module.exports = sessionMiddleware;
