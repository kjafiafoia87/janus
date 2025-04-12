# frontend/Dockerfile
FROM node:18 AS builder

WORKDIR /app
COPY . .

# Ajoute ce bloc pour éviter les plantages réseau
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

RUN npm install && npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80