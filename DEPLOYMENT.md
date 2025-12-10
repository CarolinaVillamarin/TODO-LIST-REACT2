# 🚀 Guía Completa de Despliegue: Backend (Railway) + Frontend (Netlify) + BD PostgreSQL

## Resumen de la Estrategia
- **Backend**: Node.js + Express en Railway (con PostgreSQL)
- **Frontend**: React + Vite en Netlify
- **Base de Datos**: PostgreSQL en Railway (servicio administrado)

---

## Paso 1: Preparar el Backend para Railway

### 1.1 Crear cuenta y proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión (crea cuenta si no tienes)
3. Crea un nuevo proyecto

### 1.2 Configura el archivo `.env` del backend
El archivo `.env.example` ya existe. Copia su contenido a `.env`:

```bash
cd backend
cp .env.example .env
```

**Contenido mínimo de `.env`:**
```
PORT=4000
NODE_ENV=production
```

### 1.3 Asegúrate que el Dockerfile está correcto
El Dockerfile ya existe en `backend/`. Verifica que exponga el puerto correcto.

### 1.4 Actualiza el package.json del backend
Tu `backend/package.json` ya tiene la configuración correcta con el script `start`.

---

## Paso 2: Agregar PostgreSQL a Railway

### 2.1 En el dashboard de Railway:
1. Click en "+ New" → "Database" → "PostgreSQL"
2. Railway creará automáticamente una instancia de PostgreSQL
3. Copia la `DATABASE_URL` que aparece en Variables

### 2.2 Configura la variable en Railway:
1. Ve a tu proyecto en Railway
2. Abre el servicio del backend
3. Vete a "Variables"
4. Agrega una nueva variable:
   - **Nombre**: `DATABASE_URL`
   - **Valor**: La URL de conexión a PostgreSQL (ejemplo: `postgres://user:pass@host:port/dbname`)

### 2.3 Crear la tabla en PostgreSQL
Tu código ya soporta crear tablas automáticamente, pero para asegurar que todo funcione, ejecuta esta query en Railway:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);
```

---

## Paso 3: Desplegar el Backend en Railway

### 3.1 Conecta tu repositorio GitHub a Railway
1. En Railway, en tu proyecto, click "Connect Repository"
2. Selecciona tu repositorio GitHub `CarolinaVillamarin/TODO-LIST-REACT2`
3. Railway detectará automáticamente el `Dockerfile`

### 3.2 Configura el despliegue
- En Railway: Settings → Root Directory → `./backend`
- Asegúrate que apunta a la carpeta `backend`

### 3.3 Despliega
- Railway se desplegará automáticamente
- Obtén la URL del backend (ej: `https://your-app.railway.app`)

---

## Paso 4: Preparar el Frontend para Netlify

### 4.1 Crear archivo `.env` del frontend
En la carpeta `frontend`, crea un archivo `.env`:

```
VITE_API_URL=https://your-backend.railway.app
```

Reemplaza `your-backend.railway.app` con la URL real que Railway te dio.

### 4.2 Verifica el build de Vite
Tu `frontend/package.json` ya tiene los scripts correctos:
```json
"build": "vite build"
```

---

## Paso 5: Desplegar el Frontend en Netlify

### 5.1 Crear cuenta en Netlify
Ve a [netlify.com](https://netlify.com) e inicia sesión

### 5.2 Conectar GitHub a Netlify
1. En Netlify, click "Add New Site" → "Import an existing project"
2. Selecciona GitHub y autentica
3. Selecciona tu repositorio `TODO-LIST-REACT2`

### 5.3 Configurar el despliegue
Cuando Netlify pregunte:
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 5.4 Agregar variables de entorno
1. En Netlify dashboard del sitio: Settings → Build & Deploy → Environment
2. Agrega una nueva variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.railway.app`

### 5.5 Desplegar
- Click "Deploy"
- Netlify desplegará automáticamente
- Obtendrás una URL (ej: `https://your-site.netlify.app`)

---

## Paso 6: Validar la Conexión

### 6.1 Prueba el backend directamente
```bash
curl https://your-backend.railway.app/api/todos
```

Deberías recibir un array JSON (inicialmente vacío `[]`)

### 6.2 Prueba el frontend
1. Ve a `https://your-frontend.netlify.app`
2. Intenta agregar una tarea
3. Actualiza la página y verifica que la tarea persista

### 6.3 Revisa los logs
- **Railway**: Dashboard → Backend → "Logs"
- **Netlify**: Dashboard → "Deploys" → "Deploy logs"

---

## 📋 Checklist Final

- [ ] Railway proyecto creado
- [ ] PostgreSQL agregado a Railway
- [ ] Backend desplegado en Railway
- [ ] URL del backend anotada
- [ ] Frontend actualizado con `VITE_API_URL`
- [ ] Frontend desplegado en Netlify
- [ ] Variables de entorno configuradas en ambas plataformas
- [ ] Prueba de GET `/api/todos` exitosa
- [ ] Prueba de POST nueva tarea exitosa
- [ ] Prueba de UPDATE tarea completada exitosa

---

## 🔧 Solución de Problemas

### "Connection refused" en el frontend
- Verifica que `VITE_API_URL` sea correcto en Netlify
- Asegúrate que el CORS está habilitado en Express (ya está en tu código)

### "Cannot connect to database"
- Revisa que `DATABASE_URL` esté correctamente copiada en Railway
- Verifica los logs del backend en Railway

### "Build failed en Netlify"
- Abre "Deploy logs" en Netlify
- Verifica que el comando `npm run build` funciona localmente primero

---

## 📝 Notas Importantes

1. **Variables de Entorno**: Las variables en `.env` local no se envían a GitHub. Railway y Netlify las agregarás manualmente en el dashboard.

2. **CORS**: Tu backend ya tiene CORS habilitado con `cors()` en Express.

3. **Puertos**: En local usas puerto 4000, pero Railway asigna el puerto automáticamente a través de `PORT` variable de entorno.

4. **Base de Datos**: Railway administra PostgreSQL por ti. No necesitas configurar nada más.

---

## 🎯 URLs Finales (después del despliegue)

- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-app.railway.app`
- API Base: `https://your-app.railway.app/api/todos`

¡Listo! Tu aplicación estará lista para producción.
