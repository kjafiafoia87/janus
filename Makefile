up:
	docker-compose up --build -d

down:
	docker-compose down -v --remove-orphans

logs:
	docker-compose logs -f

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
	docker-compose exec backend python indexer.py

pg-dump-local:
	pg_dump -U vincentgarrigue -d concuriadb > backend/db/dump.sql

reset-pg:
	docker-compose down -v --remove-orphans
	docker-compose up --build -d