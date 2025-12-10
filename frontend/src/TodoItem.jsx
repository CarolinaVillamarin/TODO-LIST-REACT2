import { TrashIcon } from '@heroicons/react/24/solid';


export default function TodoItem({ tarea, toggleCompleted, eliminarTarea }) {
  return (
    <li className={`todo-item ${tarea.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={tarea.completed} 
        onChange={() => toggleCompleted(tarea.id)} 
      />
      <span className="todo-text">{tarea.text}</span>
      <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
    </li>
  )
}
