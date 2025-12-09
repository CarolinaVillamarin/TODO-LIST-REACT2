const express = require('express')
const cors = require('cors')
require('./db')
const todosRouter = require('./routes/todos')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/todos', todosRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Todo API server listening on http://localhost:${PORT}`)
})
