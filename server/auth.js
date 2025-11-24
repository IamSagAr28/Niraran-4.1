const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { findOrCreateCustomer } = require('./shopify');
const router = express.Router();

// Environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'; // Frontend URL

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  console.error('❌ Missing Google OAuth configuration.');
}

const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

/**
 * GET /auth/google
 * Initiates the Google OAuth flow.
 */
router.get('/google', (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'consent',
  });
  res.redirect(authorizeUrl);
});

/**
 * GET /auth/google/callback
 * Handles the callback from Google, exchanges code for tokens,
 * verifies ID token, syncs with Shopify, and sets session.
 */
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing auth code');
  }

  try {
    // 1. Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // 2. Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // payload contains: email, email_verified, name, picture, given_name, family_name
    if (!payload.email_verified) {
      return res.status(403).send('Email not verified by Google');
    }

    // 3. Find or Create Shopify Customer
    const shopifyCustomer = await findOrCreateCustomer(payload);

    // 4. Create Session
    // We store minimal info in the secure cookie
    req.session.user = {
      id: shopifyCustomer.id,
      email: shopifyCustomer.email,
      firstName: shopifyCustomer.first_name,
      lastName: shopifyCustomer.last_name,
      googleId: payload.sub,
      picture: payload.picture,
    };

    // 5. Redirect back to frontend
    res.redirect(`${CLIENT_URL}/?login=success`);

  } catch (error) {
    console.error('OAuth Error:', error);
    res.redirect(`${CLIENT_URL}/login?error=auth_failed`);
  }
});

/**
 * GET /auth/logout
 * Clears the session.
 */
router.get('/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * GET /api/me
 * Returns the currently logged-in user.
 */
router.get('/me', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ authenticated: false });
  }
  res.json({
    authenticated: true,
    user: req.session.user,
  });
});

module.exports = router;
