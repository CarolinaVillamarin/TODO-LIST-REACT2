# 🗄️ Database - SQLite

Directorio que almacena la base de datos SQLite del proyecto.

## 📁 Contenido

```
database/
└── todos.db  (Se crea automáticamente)
```

## 📊 Estructura de la tabla `todos`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INTEGER PRIMARY KEY | ID único (auto-increment) |
| `text` | TEXT NOT NULL | Descripción de la tarea |
| `completed` | INTEGER DEFAULT 0 | Estado: 0=no completada, 1=completada |

## 🔄 Ejemplo de datos

```sql
INSERT INTO todos (text, completed) VALUES ('Comprar leche', 0);
INSERT INTO todos (text, completed) VALUES ('Estudiar React', 1);
INSERT INTO todos (text, completed) VALUES ('Hacer ejercicio', 0);
```

## 🛠️ Herramientas para inspeccionar la BD

### Opción 1: SQLite Browser (GUI)
Descarga desde: https://sqlitebrowser.org/

### Opción 2: Línea de comandos
```bash
sqlite3 database/todos.db
# Dentro de sqlite3:
sqlite> SELECT * FROM todos;
sqlite> .quit
```

### Opción 3: Prisma Studio (si tienes Prisma)
```bash
npx prisma studio
```

## 📝 Notas

- La BD se crea automáticamente cuando el backend arranca por primera vez
- SQLite no requiere servidor externo — es un archivo local
- Para desarrollo, SQLite es suficiente. Para producción, considera Postgres o MySQL

