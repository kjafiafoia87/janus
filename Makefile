up:
	docker-compose up --build -d

down:
	docker-compose down -v --remove-orphans

restarti:
	docker-compose down -v --remove-orphans
	docker-compose build
	docker-compose up -d
	docker-compose exec backend python init.py

restart:
	docker-compose down -v --remove-orphans
	docker-compose build
	docker-compose up -d

cache:
	docker-compose down -v --remove-orphans
	docker-compose build --no-cache

front:
	docker-compose stop frontend
	docker-compose build frontend
	docker-compose up -d frontend

backlogs:
	docker compose logs -f backend

logs:
	docker-compose logs -f

logsfront:
	docker-compose logs -f frontend

back:
	docker-compose logs -f backend

logsbd:
	docker-compose logs postgres

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

hardreset:
	docker system prune -a --volumes
	docker compose down -v
	docker compose up --build

ff:
	docker-compose down -v --remove-orphans
	docker compose build --no-cache
	docker-compose up