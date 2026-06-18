# Backend Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    python3-gdal \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY geopulse-serv /app/geopulse-serv
COPY geopulse-sim /app/geopulse-sim

WORKDIR /app/geopulse-serv

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
