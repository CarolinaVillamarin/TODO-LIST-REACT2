# 🔧 Backend - Todo List API

Servidor Express que proporciona una API REST para gestionar tareas.

## 📂 Estructura

```
backend/
├── index.js              — Servidor principal
├── db.js                 — Inicialización de SQLite
├── routes/
│   └── todos.js          — Rutas CRUD
├── package.json          — Dependencias
└── node_modules/         — Paquetes instalados
```

## 🚀 Cómo ejecutar

```bash
cd backend
npm install
npm start
```

Se ejecutará en: `http://localhost:4000`

## 📦 Dependencias

- **Express** — Framework web
- **CORS** — Permite peticiones desde el frontend
- **better-sqlite3** — Base de datos SQLite

## 🔌 Endpoints API

### Listar todas las tareas
```
GET /api/todos
```
Respuesta:
```json
[
  { "id": 1, "text": "Hacer compras", "completed": false },
  { "id": 2, "text": "Estudiar React", "completed": true }
]
```

### Crear tarea
```
POST /api/todos
Content-Type: application/json

{ "text": "Mi nueva tarea" }
```
Respuesta:
```json
{ "id": 3, "text": "Mi nueva tarea", "completed": false }
```

### Actualizar tarea
```
PUT /api/todos/:id
Content-Type: application/json

{ "completed": true }
```
O cambiar texto:
```json
{ "text": "Tarea actualizada" }
```

### Eliminar tarea
```
DELETE /api/todos/:id
```
Respuesta: `204 No Content`

## 🗄️ Base de Datos

La BD SQLite se crea automáticamente en `../database/todos.db`.

**Tabla `todos`:**
```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0
);
```

## 🔒 Validaciones

- El campo `text` es obligatorio y no puede estar vacío
- El ID debe existir para actualizar o eliminar
- El estado `completed` es binario (true/false)

## 📋 Ejemplo de uso (PowerShell)

**Listar tareas:**
```powershell
Invoke-RestMethod -Uri 'http://localhost:4000/api/todos' -Method GET
```

**Crear tarea:**
```powershell
Invoke-RestMethod -Uri 'http://localhost:4000/api/todos' -Method POST `
  -Body (@{ text = 'Prueba' } | ConvertTo-Json) `
  -ContentType 'application/json'
```

**Actualizar tarea:**
```powershell
Invoke-RestMethod -Uri 'http://localhost:4000/api/todos/1' -Method PUT `
  -Body (@{ completed = $true } | ConvertTo-Json) `
  -ContentType 'application/json'
```

**Eliminar tarea:**
```powershell
Invoke-RestMethod -Uri 'http://localhost:4000/api/todos/1' -Method DELETE
```

