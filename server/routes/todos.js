const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  const rows = db
    .prepare('SELECT id, text, completed FROM todos ORDER BY id DESC')
    .all()
  const todos = rows.map((r) => ({
    id: r.id,
    text: r.text,
    completed: !!r.completed,
  }))
  res.json(todos)
})

router.post('/', (req, res) => {
  const { text } = req.body
  if (!text || !text.toString().trim())
    return res.status(400).json({ error: 'text required' })
  const info = db
    .prepare('INSERT INTO todos (text, completed) VALUES (?, 0)')
    .run(text.toString().trim())
  const todo = db
    .prepare('SELECT id, text, completed FROM todos WHERE id = ?')
    .get(info.lastInsertRowid)
  res
    .status(201)
    .json({ id: todo.id, text: todo.text, completed: !!todo.completed })
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { text, completed } = req.body
  const existing = db.prepare('SELECT id FROM todos WHERE id = ?').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  if (typeof text === 'string' && typeof completed === 'boolean') {
    db.prepare('UPDATE todos SET text = ?, completed = ? WHERE id = ?').run(
      text,
      completed ? 1 : 0,
      id
    )
  } else if (typeof completed === 'boolean') {
    db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(
      completed ? 1 : 0,
      id
    )
  } else if (typeof text === 'string') {
    db.prepare('UPDATE todos SET text = ? WHERE id = ?').run(text, id)
  }

  const todo = db
    .prepare('SELECT id, text, completed FROM todos WHERE id = ?')
    .get(id)
  res.json({ id: todo.id, text: todo.text, completed: !!todo.completed })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const info = db.prepare('DELETE FROM todos WHERE id = ?').run(id)
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' })
  res.status(204).end()
})

module.exports = router
