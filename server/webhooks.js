const express = require('express');
const crypto = require('crypto');
const db = require('./database');
const { findCustomerByEmail } = require('./shopify');

const router = express.Router();

const SHOPIFY_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

// Middleware to verify Shopify Webhook Signature
const verifyShopifyWebhook = (req, res, next) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const topic = req.get('X-Shopify-Topic');
  const shop = req.get('X-Shopify-Shop-Domain');

  // req.body for webhook routes is a Buffer thanks to express.raw in index.js
  const rawBody = req.body;

  if (!hmac || !SHOPIFY_SECRET) {
    console.warn('⚠️ Missing signature or secret for webhook');
    return res.status(400).send('Missing signature or webhook secret');
  }

  try {
    const generatedHash = crypto
      .createHmac('sha256', SHOPIFY_SECRET)
      .update(rawBody)
      .digest('base64');

    if (generatedHash !== hmac) {
      console.error(`❌ Signature mismatch for topic: ${topic}`);
      return res.status(400).send('Invalid webhook signature');
    }

    // Signature verified — parse JSON now and attach to req.body so handlers can use req.body as object
    try {
      req.body = JSON.parse(rawBody.toString('utf8'));
    } catch (parseErr) {
      console.error('Webhook JSON parse error:', parseErr);
      return res.status(400).send('Invalid JSON');
    }

    next();
  } catch (e) {
    console.error('Webhook verification error:', e);
    res.status(500).send('Server Error');
  }
};

// Idempotency check
const checkIdempotency = (req, res, next) => {
  const eventId = req.get('X-Shopify-Webhook-Id');
  if (!eventId) return next();

  db.get('SELECT id FROM webhook_events WHERE id = ?', [eventId], (err, row) => {
    if (err) {
      console.error(err);
      return next();
    }
    if (row) {
      console.log(`Skipping duplicate webhook event: ${eventId}`);
      return res.status(200).send('Already processed');
    }
    
    db.run('INSERT INTO webhook_events (id, topic) VALUES (?, ?)', [eventId, req.get('X-Shopify-Topic')], (err) => {
      if (err) console.error('Error saving webhook ID:', err);
      next();
    });
  });
};

router.use(verifyShopifyWebhook);
router.use(checkIdempotency);

// --- Webhook Handlers ---

// 1. Customer Created/Updated
router.post('/customers/create', (req, res) => {
  const customer = req.body;
  console.log('Webhook: Customer Created', customer.email);
  
  // Sync with local DB if exists
  db.run(
    `UPDATE users SET shopify_customer_id = ?, first_name = ?, last_name = ? WHERE email = ?`,
    [customer.id, customer.first_name, customer.last_name, customer.email],
    function(err) {
      if (err) console.error(err);
      // If user doesn't exist locally, we might not want to create them automatically 
      // unless we want to support "Shopify-first" signups.
    }
  );
  res.status(200).send('OK');
});

router.post('/customers/update', (req, res) => {
  const customer = req.body;
  console.log('Webhook: Customer Updated', customer.email);
  
  db.run(
    `UPDATE users SET shopify_customer_id = ?, first_name = ?, last_name = ? WHERE email = ?`,
    [customer.id, customer.first_name, customer.last_name, customer.email],
    (err) => {
      if (err) console.error(err);
    }
  );
  res.status(200).send('OK');
});

// 2. Subscription Contracts (Shopify Subscriptions API)
// This covers apps that use the native Shopify Subscription APIs
router.post('/subscription_contracts/create', (req, res) => {
  const contract = req.body;
  console.log('Webhook: Subscription Created', contract.id);

  const customerId = contract.customer_id; // Shopify Customer ID
  const status = contract.status; // 'active', 'cancelled', etc.
  
  // Find local user by shopify_customer_id
  db.get('SELECT id FROM users WHERE shopify_customer_id = ?', [customerId], (err, user) => {
    if (err || !user) {
      console.error('User not found for subscription:', customerId);
      return res.status(200).send('User not found');
    }

    db.run(`INSERT INTO subscriptions (
      user_id, shopify_customer_id, provider_subscription_id, status, 
      current_period_start, current_period_end, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      user.id,
      customerId,
      contract.id,
      status.toLowerCase(),
      contract.next_billing_date ? new Date(contract.next_billing_date).toISOString() : null, // Approx start
      null, // End date depends on interval
      new Date().toISOString()
    ], (err) => {
      if (err) console.error('Error inserting subscription:', err);
    });
  });

  res.status(200).send('OK');
});

router.post('/subscription_contracts/update', (req, res) => {
  const contract = req.body;
  console.log('Webhook: Subscription Updated', contract.id);

  const status = contract.status;

  db.run(`UPDATE subscriptions SET status = ?, updated_at = ? WHERE provider_subscription_id = ?`, [
    status.toLowerCase(),
    new Date().toISOString(),
    contract.id
  ], (err) => {
    if (err) console.error('Error updating subscription:', err);
  });

  res.status(200).send('OK');
});

// 3. Order Payment (For tracking failed payments/renewals)
router.post('/orders/paid', (req, res) => {
  // Check if this order is a subscription renewal
  // Usually indicated by tags or line item properties
  console.log('Webhook: Order Paid', req.body.id);
  res.status(200).send('OK');
});

router.post('/orders/payment_failed', (req, res) => {
  console.log('Webhook: Payment Failed', req.body.id);
  // You might want to update subscription status to 'past_due' if you can link it
  res.status(200).send('OK');
});

module.exports = router;
