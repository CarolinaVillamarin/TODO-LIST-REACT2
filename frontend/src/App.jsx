import TodoItem from './TodoItem'
import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function App() {
  const [tareas, setTareas] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API}/api/todos`)
      .then((r) => r.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error('Error fetching todos', err))
  }, [])

  const agregarTarea = async () => {
    if (input.trim()) {
      try {
        const res = await fetch(`${API}/api/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input.trim() }),
        })
        if (!res.ok) throw new Error('create failed')
        const todo = await res.json()
        setTareas((prev) => [todo, ...prev])
        setInput('')
      } catch (err) {
        console.error(err)
      }
    }
  }

  const toggleCompleted = async (id) => {
    const tarea = tareas.find((t) => t.id === id)
    if (!tarea) return
    try {
      const res = await fetch(`${API}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !tarea.completed }),
      })
      if (!res.ok) throw new Error('update failed')
      const updated = await res.json()
      setTareas((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      console.error(err)
    }
  }

  const eliminarTarea = async (id) => {
    try {
      const res = await fetch(`${API}/api/todos/${id}`, { method: 'DELETE' })
      if (res.status === 204) {
        setTareas((prev) => prev.filter((t) => t.id !== id))
      } else {
        console.error('delete failed')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h1>TODO LIST APP</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir Tarea"
          onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <button onClick={agregarTarea}>Añadir Tareas</button>
      </div>

      <ul className="todos-list">
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <TodoItem key={tarea.id} tarea={tarea} toggleCompleted={toggleCompleted} eliminarTarea={eliminarTarea} />
          ))
        ) : (
          <div className="empty-state">No hay tareas. ¡Agrega una!</div>
        )}
      </ul>
    </div>
  )
}
