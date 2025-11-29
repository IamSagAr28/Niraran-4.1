const express = require('express');
const db = require('./database');
const router = express.Router();

// Middleware to check if user is admin (Simple check for now, can be expanded)
const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // In a real app, check a role field or specific email
  // if (req.session.user.role !== 'admin') return res.status(403).send('Forbidden');
  next();
};

// Public debug route
router.get('/ping', (req, res) => res.send('Admin Pong'));

// GET /admin/users - List all users and their subscription status
router.get('/users', requireAdmin, (req, res) => {
  const sql = `
    SELECT u.id, u.email, u.first_name, u.last_name, u.created_at,
           s.status as subscription_status, s.current_period_end
    FROM users u
    LEFT JOIN subscriptions s ON u.id = s.user_id
    ORDER BY u.created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /admin/cancel-subscription - Force cancel a subscription locally
router.post('/cancel-subscription', requireAdmin, (req, res) => {
  const { userId } = req.body;

  db.run(
    `UPDATE subscriptions SET status = 'canceled', updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`,
    [userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Subscription not found' });

      // Log action
      console.log(`Admin canceled subscription for user ${userId}`);
      res.json({ message: 'Subscription canceled locally' });
    }
  );
});

// GET /admin/audit-logs - Simple audit log (using webhook events for now)
router.get('/audit-logs', requireAdmin, (req, res) => {
  db.all('SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 50', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
