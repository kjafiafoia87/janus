up:
	docker-compose up --build -d

down:
	docker-compose down -v --remove-orphans


restart:
	docker-compose down -v --remove-orphans
	docker-compose build
	docker-compose up -d
	docker compose logs -f backend 

cache:
	docker-compose down -v --remove-orphans
	docker-compose build --no-cache

front:
	docker-compose stop frontend
	docker-compose build frontend
	docker-compose up -d frontend

back:
	docker-compose stop backend
	docker-compose build backend
	docker-compose up -d backend

logs:
	docker-compose logs -f

logsfront:
	docker-compose logs -f frontend

back:
	docker-compose logs -f backend

logsbd:
	docker-compose logs postgres

logsback:
	docker compose logs -f backend 

rebuild:
	docker-compose down
	docker-compose build
	docker-compose up -d

backend:
	docker-compose exec backend bash

frontend:
	docker-compose exec frontend sh

psql:
	docker-compose exec postgres psql -U vincentgarrigue -d concuriadb

reindex:
	docker-compose exec backend python init.py

pg-dump-local:
	pg_dump -U vincentgarrigue -d concuriadb > backend/db/dump.sql

resetpg:
	docker-compose down -v --remove-orphans
	docker-compose up --build -d
	docker-compose exec backend python indexer.py