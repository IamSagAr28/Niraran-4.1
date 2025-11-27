const db = require('./database');

const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const requireMembership = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = req.session.user.id; // Local DB ID

  db.get(
    `SELECT status, current_period_end FROM subscriptions 
     WHERE user_id = ? AND status IN ('active', 'trialing') 
     ORDER BY created_at DESC LIMIT 1`,
    [userId],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!row) {
        return res.status(403).json({ error: 'Membership required', redirect: '/membership' });
      }

      // Optional: Check expiration date if you trust it more than status
      // if (new Date(row.current_period_end) < new Date()) { ... }

      req.subscription = row;
      next();
    }
  );
};

module.exports = { requireAuth, requireMembership };
