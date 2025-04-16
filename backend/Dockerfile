FROM python:3.11-slim

WORKDIR /app

ENV PIP_DEFAULT_TIMEOUT=180 \
    PIP_RETRIES=5 \
    PIP_NO_CACHE_DIR=1

# 🔧 Utiles pour debug
RUN apt-get update && apt-get install -y curl && apt-get clean

# 🔁 Étape 1 : copier requirements pour forcer le cache
COPY requirements.txt .

# 💣 Étape 2 : supprimer toute version installée (par précaution)
RUN pip uninstall -y elasticsearch || true

# ✅ Étape 3 : installer explicitement la bonne version
RUN pip install "elasticsearch>=8.12.0"

# 👀 Étape 4 : vérifier la version active
RUN python -c "import elasticsearch; print('✅ ES version:', elasticsearch.__version__)"

# 📦 Étape 5 : installer les autres dépendances
RUN pip install -r requirements.txt

# Copier le code
COPY . .

# Rendre le script de démarrage exécutable
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]