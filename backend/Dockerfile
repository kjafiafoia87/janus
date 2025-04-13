FROM python:3.11-slim

WORKDIR /app

# Augmenter les délais réseau pour pip
ENV PIP_DEFAULT_TIMEOUT=180 \
    PIP_RETRIES=5 \
    PIP_NO_CACHE_DIR=1

# Copier requirements en premier pour profiter du cache Docker
COPY requirements.txt .

# Installer les dépendances avec fallback vers un miroir PyPI rapide
RUN pip install --default-timeout=180 \
    --retries=5 \
    --index-url=https://pypi.org/simple \
    -r requirements.txt

# Copier le reste du code
COPY . .

# Rendre le script de démarrage exécutable
RUN chmod +x /app/entrypoint.sh

# Point d'entrée
ENTRYPOINT ["./entrypoint.sh"]