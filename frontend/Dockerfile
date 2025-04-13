# Étape 1 : Builder le frontend avec Node.js
FROM node:18 AS builder

# Dossier de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json (si présent)
COPY package*.json ./

# Optimisation réseau pour npm
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Build de l’application (prod)
RUN npm run build

# Étape 2 : Servir le build avec NGINX
FROM nginx:stable-alpine

# Supprimer la config par défaut de NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copie des fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie de la configuration personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port HTTP
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]