const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
const path = require('path');

// Check if we are using Postgres (Production/Vercel) or SQLite (Local)
const isPostgres = !!process.env.DATABASE_URL;

let db;

if (isPostgres) {
  console.log('🔌 Connecting to PostgreSQL...');
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for most cloud DBs like Vercel Postgres/Neon
  });
  
  initPgDb();
} else {
  console.log('📂 Connecting to local SQLite...');
  const dbPath = path.resolve(__dirname, 'database.sqlite');
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening SQLite database:', err.message);
    else {
      console.log(`Connected to SQLite at ${dbPath}`);
      initSqliteDb();
    }
  });
}

// --- Initialization Scripts ---

function initPgDb() {
  const createTables = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      first_name TEXT,
      last_name TEXT,
      shopify_customer_id TEXT,
      google_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      shopify_customer_id TEXT,
      provider_subscription_id TEXT UNIQUE,
      provider TEXT DEFAULT 'shopify',
      status TEXT,
      current_period_start TIMESTAMP,
      current_period_end TIMESTAMP,
      cancel_at_period_end BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS webhook_events (
      id TEXT PRIMARY KEY,
      topic TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTables)
    .then(() => console.log('✅ PostgreSQL tables initialized.'))
    .catch(err => console.error('❌ Error initializing Postgres tables:', err));
}

function initSqliteDb() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      first_name TEXT,
      last_name TEXT,
      shopify_customer_id TEXT,
      google_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      shopify_customer_id TEXT,
      provider_subscription_id TEXT UNIQUE,
      provider TEXT DEFAULT 'shopify',
      status TEXT,
      current_period_start DATETIME,
      current_period_end DATETIME,
      cancel_at_period_end BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS webhook_events (
      id TEXT PRIMARY KEY,
      topic TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('✅ SQLite tables initialized.');
  });
}

// --- Unified Interface Wrapper ---
// We need to normalize methods because sqlite3 uses callback style (run, get, all)
// and pg uses Promise style (query).

const dbWrapper = {
  // Run a query that doesn't return rows (INSERT, UPDATE, DELETE)
  run: (sql, params = [], callback) => {
    if (isPostgres) {
      // Convert SQLite ? placeholders to Postgres $1, $2...
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      
      db.query(pgSql, params)
        .then(res => {
          // Simulate SQLite 'this' context for lastID and changes
          const context = { lastID: 0, changes: res.rowCount }; 
          // Note: Postgres doesn't return lastID easily on INSERT unless we use RETURNING id
          // We might need to adjust INSERT queries to use 'RETURNING id'
          if (callback) callback.call(context, null);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    } else {
      db.run(sql, params, callback);
    }
  },

  // Get a single row
  get: (sql, params = [], callback) => {
    if (isPostgres) {
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      
      db.query(pgSql, params)
        .then(res => {
          if (callback) callback(null, res.rows[0]);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    } else {
      db.get(sql, params, callback);
    }
  },

  // Get all rows
  all: (sql, params = [], callback) => {
    if (isPostgres) {
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      
      db.query(pgSql, params)
        .then(res => {
          if (callback) callback(null, res.rows);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    } else {
      db.all(sql, params, callback);
    }
  }
};

module.exports = dbWrapper;
