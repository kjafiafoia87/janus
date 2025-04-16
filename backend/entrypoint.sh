#!/bin/sh

echo "Lancement de l'initialisation..."

# Arrêter si init.py échoue
if ! python init.py; then
  echo "❌ Échec de l'initialisation. Arrêt du backend."
  exit 1
fi

echo "✅ Indexation terminée, lancement de l'app Flask..."
python app.py