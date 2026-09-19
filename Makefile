.PHONY: install-db install-backend install-frontend install-all \
        run-db run-backend run-frontend run-all \
        docker-build docker-up docker-down docker-logs

# ---- Install (non-docker, except db which always runs via docker) ----

install-db:
	docker compose up -d postgres

install-backend:
	cd backend && uv sync

install-frontend:
	cd frontend && npm install

install-all: install-db install-backend install-frontend

# ---- Run individually (non-docker) ----

run-db:
	docker compose up -d postgres

run-backend:
	cd backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

run-frontend:
	cd frontend && npm run dev

run-all:
	$(MAKE) run-db
	( trap 'kill 0' EXIT; $(MAKE) run-backend & $(MAKE) run-frontend & wait )

# ---- Docker Compose (backend + frontend + postgres all in containers) ----

docker-build:
	docker compose build

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f
