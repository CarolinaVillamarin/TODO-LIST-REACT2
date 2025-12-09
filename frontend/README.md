# 🎨 Frontend - Todo List React

Aplicación de interfaz de usuario construida con **React 19** y **Vite**.

## 📂 Estructura

```
frontend/
├── src/
│   ├── App.jsx           — Componente principal (estado y lógica)
│   ├── TodoItem.jsx      — Componente individual de tarea
│   ├── main.jsx          — Punto de entrada de React
│   ├── App.css           — Estilos globales
│   └── index.css         — Tailwind CSS
├── index.html            — HTML principal
├── package.json          — Dependencias
├── vite.config.js        — Configuración de Vite
└── node_modules/         — Paquetes instalados
```

## 🚀 Cómo ejecutar

```bash
cd frontend
npm install
npm run dev
```

Se abrirá en: `http://localhost:5173`

## 📦 Dependencias principales

- **React 19** — Librería UI
- **React DOM** — Renderizador de React
- **Heroicons** — Iconos (ícono de basura)
- **Vite** — Build tool rápido
- **Tailwind CSS** — Framework de estilos

## 🔧 Scripts disponibles

- `npm run dev` — Inicia servidor de desarrollo
- `npm run build` — Compila para producción
- `npm run preview` — Visualiza build de producción
- `npm run lint` — Ejecuta linter

## 🌐 Conexión con API

El frontend se conecta a la API del backend en:
```javascript
const API = 'http://localhost:4000/api/todos'
```

Si cambias el puerto, actualiza esta constante en `src/App.jsx`.

## 📱 Características

- ✅ Crear tareas
- ✅ Marcar como completadas
- ✅ Eliminar tareas
- ✅ Sincronización en tiempo real con el backend

