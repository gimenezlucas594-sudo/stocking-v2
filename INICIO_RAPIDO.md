# 🚀 GUÍA DE INICIO RÁPIDO - StocKing v2.0

## ⚡ Primeros Pasos (5 minutos)

### 1. Abrir PyCharm con el proyecto

1. Abrí PyCharm
2. File → Open → Seleccionar carpeta `stocking_v2`

---

### 2. Instalar dependencias

**Opción A - Terminal de PyCharm:**
```bash
cd backend
pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-multipart
```

**Opción B - Si tenés problemas:**
```bash
pip install -r backend/requirements.txt
```

---

### 3. Inicializar la base de datos

```bash
cd backend
python init_db.py
```

✅ Esto crea:
- Base de datos `stocking.db`
- 2 locales de prueba
- 4 usuarios (lucas, jefe_mama, empleado1, empleado2)

---

### 4. Levantar el backend

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend corriendo en: **http://127.0.0.1:8000**
📚 Documentación API: **http://127.0.0.1:8000/docs**

---

### 5. Levantar el frontend

**En otra terminal:**
```bash
cd frontend
python -m http.server 3000
```

✅ Frontend corriendo en: **http://127.0.0.1:3000/public/**

---

## 🎯 Probar el Sistema

1. Abrí tu navegador: **http://127.0.0.1:3000/public/**
2. Probá login con:
   - Usuario: `lucas` 
   - Contraseña: `1234`
3. Vas a ver el dashboard de jefe con estadísticas

### Otros usuarios para probar:
- `empleado1` / `1234` → Dashboard empleado (Local Centro)
- `empleado2` / `1234` → Dashboard empleado (Local Norte)
- `jefe_mama` / `1234` → Dashboard jefe

---

## 🐛 Si algo no funciona:

### Backend no arranca:
```bash
# Ver si el puerto está ocupado
netstat -ano | findstr :8000

# Cambiar de puerto
uvicorn app.main:app --reload --port 8001
```

### Frontend no conecta al backend:
- Asegurate que ambos servidores estén corriendo
- Verificá la consola del navegador (F12)
- El backend debe estar en puerto 8000

### Error "module not found":
```bash
pip install [nombre-del-modulo] --break-system-packages
```

---

## 📱 Estructura Actual

```
✅ Sistema de login completo
✅ 3 roles: Jefe Papá, Jefe Mamá, Empleado
✅ Dashboard diferenciado por rol
✅ Sistema de locales
✅ Base de datos con SQLAlchemy
✅ API REST con FastAPI
✅ Frontend React con Tailwind

🔜 Próximo a agregar:
- CRUD de productos
- Registro de ventas
- Control de stock
- Reportes
```

---

## 🎉 ¡Listo!

Una vez que tengas todo corriendo, avisame y empezamos a agregar:
- Productos
- Ventas
- Lo que necesites

---

## 💡 Tips Útiles

**Ver logs del backend:**
- Mirá la terminal donde corriste uvicorn

**Reiniciar todo:**
- Ctrl+C en ambas terminales
- Volver a correr los comandos

**Cambiar credenciales:**
- Editá `backend/init_db.py`
- Borrá `backend/stocking.db`
- Ejecutá `python init_db.py` de nuevo

**API Documentation:**
- http://127.0.0.1:8000/docs (Swagger UI)
- http://127.0.0.1:8000/redoc (ReDoc)
