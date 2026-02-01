FROM python:3.11-slim

WORKDIR /app

# Copiar requirements
COPY backend/requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código
COPY backend/ .

# Crear base de datos inicial
RUN python init_db.py || true

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]