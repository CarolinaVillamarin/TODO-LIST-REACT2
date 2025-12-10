# ⚡ GUÍA RÁPIDA DE DESPLIEGUE (Paso a Paso)

## 🔴 PASO 1: Preparar el Backend

### 1. Sube tu código a GitHub
```bash
git add .
git commit -m "Setup para deployment en Railway y Netlify"
git push origin main
```

---

## 🔵 PASO 2: Desplegar Backend + BD en Railway

### 1. Abre [railway.app](https://railway.app)
- Inicia sesión con GitHub
- Click "New Project"

### 2. Click "Deploy from GitHub Repo"
- Selecciona tu repositorio: `CarolinaVillamarin/TODO-LIST-REACT2`
- Autoriza el acceso si te lo pide

### 3. Railway detectará el Dockerfile
- Haz click en el nuevo servicio "railway-deploy"

### 4. Configura el Root Directory
- Ve a Settings
- **Root Directory**: Cambia a `./backend`
- Click "Update"

### 5. Agrega PostgreSQL
- En tu proyecto, click "+ New"
- Selecciona "Database" → "PostgreSQL"
- Railway lo creará automáticamente

### 6. Conecta la BD al Backend
- Haz click en el servicio del Backend
- Ve a "Variables"
- La `DATABASE_URL` debería aparecer automáticamente conectada a PostgreSQL
- Si no aparece, cópiala manualmente desde la BD

### 7. Despliega
- Railway comenzará el despliegue automáticamente
- Cuando esté listo, ve a "Settings" en tu servicio
- Busca "Public Network URL"
- **Copia esta URL** - es tu `BACKEND_URL` (ej: `https://todolist-backend.railway.app`)

✅ **El backend está desplegado**

---

## 🟢 PASO 3: Desplegar Frontend en Netlify

### 1. Abre [netlify.com](https://netlify.com)
- Inicia sesión con GitHub
- Click "Add new site" → "Import an existing project"

### 2. Autoriza Netlify
- Click "GitHub" y autoriza

### 3. Selecciona tu repositorio
- Busca `CarolinaVillamarin/TODO-LIST-REACT2`
- Click seleccionar

### 4. Configura el despliegue
Cuando Netlify pregunte por la configuración:

**Build settings:**
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Click "Deploy"

### 5. Agrega Variables de Entorno
- Una vez desplegado, ve al sitio en Netlify
- Settings → Build & Deploy → Environment
- Click "Edit variables"
- Agrega:
  - **Key**: `VITE_API_URL`
  - **Value**: `https://todolist-backend.railway.app` (reemplaza con tu URL de Railway)

### 6. Redeploy
- Ve a "Deploys"
- Click en el último despliegue
- Click "Trigger deploy" → "Deploy site"

✅ **El frontend está desplegado**

---

## 🟡 PASO 4: Validar que Todo Funciona

### Test 1: Verificar que el backend responde
```bash
curl https://todolist-backend.railway.app/api/todos
```
Deberías ver: `[]` (array vacío)

### Test 2: Ir al frontend
- Abre: `https://your-netlify-site.netlify.app`
- Deberías ver tu aplicación de tareas

### Test 3: Crear una tarea
1. Escribe un nombre en el input
2. Click en "Agregar"
3. La tarea debe aparecer
4. Recarga la página - **la tarea debe persistir en la BD**

### Test 4: Marcar como completada
1. Haz click en el checkbox de una tarea
2. Recarga la página - **debe mantener el estado**

---

## ⚠️ Si algo no funciona

### "Cannot connect to API"
1. Abre la consola del navegador (F12)
2. Ve a Network
3. Intenta agregar una tarea
4. Busca la solicitud a `/api/todos`
5. Si falla, verifica:
   - La `VITE_API_URL` en Netlify sea correcta
   - El backend esté desplegado en Railway

### "Database error en Railway"
1. Ve a tu Backend en Railway
2. Click "Logs"
3. Busca mensajes de error
4. Verifica que `DATABASE_URL` esté configurada

### "Build falló en Netlify"
1. Ve a Netlify → "Deploys"
2. Click en el deploy fallido
3. Click "Deploy log"
4. Lee el error
5. Prueba localmente: `cd frontend && npm run build`

---

## 📋 RESUMEN DE URLs

Después del despliegue, tendrás estas URLs:

| Servicio | URL |
|----------|-----|
| Frontend | `https://your-site.netlify.app` |
| Backend API | `https://your-backend.railway.app` |
| Base de Datos | Administrada por Railway (no acceso directo) |

---

## 🎯 Próximos Pasos (Opcional)

- Agregar un dominio personalizado en Netlify
- Configurar CI/CD automático para despliegues
- Agregar logging/monitoring en Railway
- Hacer backups de la BD PostgreSQL

---

**¡Listo! Tu aplicación está en producción** 🚀

Si algo no funciona, revisa los logs en Railway y Netlify.
