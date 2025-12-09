const express = require('express')
const router = express.Router()

const isPg = !!process.env.DATABASE_URL

let sqliteDb
let dbAll, dbGet, dbRun
let pgPool

if (isPg) {
  const { Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  pgPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
} else {
  sqliteDb = require('../db')
  dbAll = (sql, params = []) =>
    new Promise((resolve, reject) => {
      sqliteDb.all(sql, params, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  dbGet = (sql, params = []) =>
    new Promise((resolve, reject) => {
      sqliteDb.get(sql, params, (err, row) => {
        if (err) return reject(err)
        resolve(row)
      })
    })
  dbRun = (sql, params = []) =>
    new Promise((resolve, reject) => {
      sqliteDb.run(sql, params, function (err) {
        if (err) return reject(err)
        resolve({ lastID: this.lastID, changes: this.changes })
      })
    })
}

router.get('/', async (req, res) => {
  try {
    if (isPg) {
      const result = await pgPool.query('SELECT id, text, completed FROM todos ORDER BY id DESC')
      return res.json(result.rows.map((r) => ({ id: r.id, text: r.text, completed: r.completed })))
    }

    const rows = await dbAll('SELECT id, text, completed FROM todos ORDER BY id DESC')
    res.json((rows || []).map((r) => ({ id: r.id, text: r.text, completed: !!r.completed })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.toString().trim()) return res.status(400).json({ error: 'text required' })

    if (isPg) {
      const result = await pgPool.query('INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING id, text, completed', [
        text.toString().trim(),
        false,
      ])
      const todo = result.rows[0]
      return res.status(201).json({ id: todo.id, text: todo.text, completed: todo.completed })
    }

    const runRes = await dbRun('INSERT INTO todos (text, completed) VALUES (?, 0)', [text.toString().trim()])
    const todo = await dbGet('SELECT id, text, completed FROM todos WHERE id = ?', [runRes.lastID])
    res.status(201).json({ id: todo.id, text: todo.text, completed: !!todo.completed })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { text, completed } = req.body

    if (isPg) {
      const check = await pgPool.query('SELECT id FROM todos WHERE id = $1', [id])
      if (check.rowCount === 0) return res.status(404).json({ error: 'Not found' })

      if (typeof text === 'string' && typeof completed === 'boolean') {
        await pgPool.query('UPDATE todos SET text = $1, completed = $2 WHERE id = $3', [text, completed, id])
      } else if (typeof completed === 'boolean') {
        await pgPool.query('UPDATE todos SET completed = $1 WHERE id = $2', [completed, id])
      } else if (typeof text === 'string') {
        await pgPool.query('UPDATE todos SET text = $1 WHERE id = $2', [text, id])
      }

      const result = await pgPool.query('SELECT id, text, completed FROM todos WHERE id = $1', [id])
      const todo = result.rows[0]
      return res.json({ id: todo.id, text: todo.text, completed: todo.completed })
    }

    const existing = await dbGet('SELECT id FROM todos WHERE id = ?', [id])
    if (!existing) return res.status(404).json({ error: 'Not found' })

    if (typeof text === 'string' && typeof completed === 'boolean') {
      await dbRun('UPDATE todos SET text = ?, completed = ? WHERE id = ?', [text, completed ? 1 : 0, id])
    } else if (typeof completed === 'boolean') {
      await dbRun('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id])
    } else if (typeof text === 'string') {
      await dbRun('UPDATE todos SET text = ? WHERE id = ?', [text, id])
    }

    const todo = await dbGet('SELECT id, text, completed FROM todos WHERE id = ?', [id])
    res.json({ id: todo.id, text: todo.text, completed: !!todo.completed })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isPg) {
      const result = await pgPool.query('DELETE FROM todos WHERE id = $1', [id])
      if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
      return res.status(204).end()
    }

    const runRes = await dbRun('DELETE FROM todos WHERE id = ?', [id])
    if (runRes.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
