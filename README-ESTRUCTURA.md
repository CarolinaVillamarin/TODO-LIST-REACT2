# 📁 Estructura del Proyecto Todo-List-React

El proyecto está organizado en **3 carpetas principales**:

## 1. **frontend/** — Aplicación React (Vite)
Contiene toda la interfaz de usuario en React.

```
frontend/
├── src/
│   ├── App.jsx          (Componente principal)
│   ├── TodoItem.jsx     (Componente de tarea)
│   ├── main.jsx         (Punto de entrada)
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── node_modules/
```

**Cómo ejecutar:**
```bash
cd frontend
npm install
npm run dev
```
Abre: `http://localhost:5173`

---

## 2. **backend/** — Servidor Express (Node.js)
API REST que maneja la lógica de negocio y conexión con la BD.

```
backend/
├── index.js              (Servidor principal)
├── db.js                 (Configuración SQLite)
├── routes/
│   └── todos.js          (Endpoints CRUD)
├── package.json
└── node_modules/
```

**Endpoints:**
- `GET /api/todos` — Listar todas las tareas
- `POST /api/todos` — Crear tarea (body: `{ "text": "..." }`)
- `PUT /api/todos/:id` — Actualizar tarea
- `DELETE /api/todos/:id` — Eliminar tarea

**Cómo ejecutar:**
```bash
cd backend
npm install
npm start
```
Escucha en: `http://localhost:4000`

---

## 3. **database/** — Base de Datos SQLite
Almacena las tareas de forma persistente.

```
database/
└── todos.db  (Se crea automáticamente al arrancar el backend)
```

La BD tiene una tabla `todos` con columnas:
- `id` — ID único (auto-increment)
- `text` — Descripción de la tarea
- `completed` — Estado (0 o 1)

---

## 🚀 Cómo ejecutar todo

### **Opción 1: Dos terminales (Recomendado)**

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

### **Opción 2: Una sola terminal (con concurrently)**
Desde la raíz del proyecto (requiere tener `concurrently` instalado globalmente o en el script):
```bash
npm install -g concurrently
concurrently "cd backend && npm start" "cd frontend && npm run dev"
```

---

## 📊 Flujo de Datos

```
[Frontend React]  ←→  [API Express]  ←→  [SQLite DB]
  localhost:5173      localhost:4000      database/todos.db
```

1. El frontend hace fetch a `http://localhost:4000/api/todos`
2. El backend recibe la petición y consulta la BD
3. Los datos se sincroniza en tiempo real

---

## 📝 Notas Importantes

- La BD SQLite se crea automáticamente en `database/todos.db` la primera vez que se ejecuta el backend.
- Asegúrate de tener **Node.js v14+** instalado.
- El frontend necesita que el backend esté corriendo para funcionar correctamente.
- Si cambia el puerto del backend, actualiza la constante `API` en `frontend/src/App.jsx`.

