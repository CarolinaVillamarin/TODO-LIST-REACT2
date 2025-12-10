require('dotenv').config()
const { Pool } = require('pg')

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not set, skipping migration')
    process.exit(0)
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Database migration completed successfully')
  } catch (err) {
    console.error('❌ Migration error:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
