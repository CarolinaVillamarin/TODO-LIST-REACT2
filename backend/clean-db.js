require('dotenv').config()
const { Pool } = require('pg')

async function cleanDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not set')
    process.exit(1)
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    // Eliminar tabla antigua
    await pool.query('DROP TABLE IF EXISTS todos')
    console.log('✅ Tabla antigua eliminada')

    // Crear tabla nueva
    await pool.query(`
      CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabla nueva creada correctamente')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

cleanDatabase()
