require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db')
const todosRouter = require('./routes/todos')

const app = express()
app.use(cors()) // Temporal: permitir todo origen para diagnóstico
app.use(express.json())

// Ruta raíz para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.json({ message: 'Todo API server is running' })
})

app.use('/api/todos', todosRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Todo API server listening on http://localhost:${PORT}`)
})
