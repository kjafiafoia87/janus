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
	docker-compose exec backend python init.py

cache:
	docker-compose down -v --remove-orphans
	docker-compose build --no-cache

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
	docker-compose exec backend python init.py

pg-dump-local:
	pg_dump -U vincentgarrigue -d concuriadb > backend/db/dump.sql

resetpg:
	docker-compose down -v --remove-orphans
	docker-compose up --build -d
	docker-compose exec backend python indexer.py