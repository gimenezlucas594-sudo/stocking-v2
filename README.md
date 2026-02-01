    # 🏪 StocKing v2.0 - Sistema de Gestión

Sistema completo para gestionar ventas, stock y empleados en tus 2 locales.

## 🚀 Instalación y Ejecución

### 1️⃣ Backend (FastAPI)

```bash
# Ir a la carpeta backend
cd stocking_v2/backend

# Instalar dependencias
pip install -r requirements.txt

# Inicializar la base de datos (SOLO LA PRIMERA VEZ)
python init_db.py

# Levantar el servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará en: **http://127.0.0.1:8000**

### 2️⃣ Frontend (React)

```bash
# Ir a la carpeta frontend
cd stocking_v2/frontend

# Levantar servidor simple de desarrollo
python -m http.server 3000
```

El frontend estará en: **http://127.0.0.1:3000/public/**

---

## 👥 Usuarios de Prueba

Después de ejecutar `init_db.py`, tendrás estos usuarios:

| Usuario    | Contraseña | Rol         | Local        |
|------------|-----------|-------------|--------------|
| lucas      | 1234      | Jefe Papá   | Sin asignar  |
| jefe_mama  | 1234      | Jefe Mamá   | Sin asignar  |
| empleado1  | 1234      | Empleado    | Local Centro |
| empleado2  | 1234      | Empleado    | Local Norte  |

---

## 🎯 Funcionalidades Actuales

### ✅ Ya implementado:
- Login con JWT (tokens seguros)
- Roles diferenciados (Jefe Papá, Jefe Mamá, Empleado)
- Dashboard para jefes
- Dashboard para empleados
- Sistema de locales
- Creación de usuarios

### 📋 Por implementar (siguientes pasos):
- CRUD de productos
- Registro de ventas por local
- Control de stock en tiempo real
- Reportes de ventas
- Estadísticas por local
- Sistema de alertas de stock bajo

---

## 🔧 API Endpoints

### Auth
- `POST /api/auth/login` - Login de usuarios

### Users
- `GET /api/users/me` - Obtener info del usuario actual
- `GET /api/users/` - Listar usuarios (solo jefes)
- `POST /api/users/` - Crear usuario (solo jefes)
- `GET /api/users/locales` - Listar locales
- `POST /api/users/locales` - Crear local (solo jefes)

Documentación completa de la API: **http://127.0.0.1:8000/docs**

---

## 🌐 Desplegar en Internet (Producción)

Para que lo puedas acceder desde cualquier lado:

### Opción 1: Railway (Recomendado - Gratis)
1. Crear cuenta en railway.app
2. Conectar tu repositorio GitHub
3. Railway detecta FastAPI automáticamente
4. Agregar variable de entorno: `SECRET_KEY=tu-clave-super-segura`

### Opción 2: Render
1. Crear cuenta en render.com
2. New → Web Service
3. Conectar repositorio
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Opción 3: VPS (DigitalOcean, AWS, etc.)
- Instalar Docker
- Usar nginx como reverse proxy
- Certificado SSL con Let's Encrypt

---

## 📱 Estructura del Proyecto

```
stocking_v2/
├── backend/
│   ├── app/
│   │   ├── main.py           # Aplicación principal
│   │   ├── database.py       # Configuración DB
│   │   ├── models.py         # Modelos SQLAlchemy
│   │   ├── schemas.py        # Schemas Pydantic
│   │   ├── auth.py           # Autenticación JWT
│   │   └── routers/
│   │       ├── auth.py       # Endpoints de login
│   │       └── users.py      # Endpoints de usuarios
│   ├── init_db.py            # Script inicialización
│   ├── requirements.txt      # Dependencias Python
│   └── stocking.db           # Base de datos SQLite
└── frontend/
    ├── public/
    │   └── index.html        # HTML base
    └── src/
        └── App.jsx           # Componente React principal
```

---

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración
- Endpoints protegidos por rol
- CORS configurado (cambiar en producción)

**⚠️ IMPORTANTE:** Antes de subir a producción, cambiar el `SECRET_KEY` en `backend/app/auth.py`

---

## 💡 Próximos Pasos

1. **Productos**: CRUD completo con fotos
2. **Ventas**: Registrar ventas con detalle
3. **Stock**: Control automático al vender
4. **Reportes**: Gráficos de ventas por día/mes/local
5. **Notificaciones**: Alertas de stock bajo
6. **App Móvil**: Versión para celular

---

## 🆘 Solución de Problemas

**Error: "ModuleNotFoundError"**
→ Instalar dependencias: `pip install -r requirements.txt`

**Error: "Address already in use"**
→ Puerto ocupado, cambiar a otro: `--port 8001`

**No puedo acceder desde otro dispositivo**
→ Usar `--host 0.0.0.0` en uvicorn

**Frontend no carga el backend**
→ Verificar que ambos servidores estén corriendo

---

## 📞 Contacto

Cualquier duda, avisame y seguimos agregando funcionalidades 🚀
