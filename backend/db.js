const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbDir = path.join(__dirname, '..', 'database')
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })

const dbPath = path.join(dbDir, 'todos.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err)
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
      )`,
      (err) => {
        if (err) console.error('Error creating table:', err)
        else console.log('Database initialized')
      }
    )
  }
})

module.exports = db
