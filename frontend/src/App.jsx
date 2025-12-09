import TodoItem from './TodoItem'
import { useState, useEffect } from 'react'

const API = 'http://localhost:4000/api/todos'

export default function App() {
  const [tareas, setTareas] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error('Error fetching todos', err))
  }, [])

  const agregarTarea = async () => {
    if (input.trim()) {
      try {
        const res = await fetch(API, {
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
      const res = await fetch(`${API}/${id}`, {
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
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
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
    <div className="max-w-md mx-auto mt-10 p-2  rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">TODO LIST APP</h1>
      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir Tarea"
        />
        <button className="bg-blue-500 text-white px-4 p-y-2 rounded" onClick={agregarTarea}>
          Añadir Tareas
        </button>
      </div>

      <div className="space-y-2 ">
        {tareas.map((tarea) => (
          <TodoItem key={tarea.id} tarea={tarea} toggleCompleted={toggleCompleted} eliminarTarea={eliminarTarea} />
        ))}
      </div>
    </div>
  )
}
