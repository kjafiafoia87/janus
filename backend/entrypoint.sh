#!/bin/sh

echo "Lancement de l'initialisation..."

python init.py

echo "Indexation terminée, lancement de l'app Flask..."
python app.py