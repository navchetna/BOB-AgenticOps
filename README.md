# BOB

Minimal full-stack app: FastAPI backend, React frontend, PostgreSQL database.
Includes signup/login and a simple details-submission form.

The frontend also includes a Bank of Baroda-branded workspace demo for
agentic application-onboarding — see [docs/FEATURES.md](docs/FEATURES.md)
for a full feature and data-model description.

## Run it in 3 steps

1. Install [Docker](https://docs.docker.com/get-docker/) (with the Compose plugin) if you don't already have it.
2. From this folder, run:
   ```bash
   make docker-up
   ```
3. Open http://localhost:5173 in your browser, create an account, log in, and fill in the form.

That single command builds and starts the database, backend, and frontend for you.
To stop everything, run `make docker-down`.

If your network requires an HTTP proxy, make sure `http_proxy`/`https_proxy` are
set in your shell before running `make docker-up` — they're passed through
automatically.

## Stack

- **Backend**: FastAPI, SQLAlchemy, JWT auth ([uv](https://docs.astral.sh/uv/) for package management)
- **Frontend**: React + Vite
- **Database**: PostgreSQL, always run via Docker (no sudo required)

## Project layout

```
backend/    FastAPI app (app/), pyproject.toml (uv)
frontend/   React app (src/)
docker-compose.yml   postgres + backend + frontend containers
Makefile             install/run shortcuts
```

## Developing without Docker (backend and frontend run natively)

Prerequisites: [uv](https://docs.astral.sh/uv/getting-started/installation/) and Node.js 18+/npm.
Postgres still runs in Docker (no sudo required for it).

### 1. Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Defaults work out of the box for local development.

### 2. Install

```bash
make install-db         # start the Postgres container
make install-backend    # uv sync (backend/.venv)
make install-frontend   # npm install (frontend/node_modules)

# or do all three at once
make install-all
```

### 3. Run

```bash
make run-db          # ensure Postgres container is up
make run-backend      # uvicorn on http://localhost:8000
make run-frontend     # vite dev server on http://localhost:5173

# or start db + backend + frontend together
make run-all
```

Open http://localhost:5173, sign up, log in, then submit the form.
API docs are available at http://localhost:8000/docs.

## Docker Compose reference

```bash
make docker-up      # docker compose up -d --build
make docker-logs     # follow logs
make docker-down     # stop and remove containers
```

Postgres's port is published to the host as `5434` in `docker-compose.yml`
(5432 is often already taken on shared machines), so it's reachable both from
other containers (as `postgres:5432`) and from the host (as
`localhost:5434`) — useful when running the backend outside Docker against
the same database.

## API overview

- `POST /auth/signup` — create a user (`email`, `password`)
- `POST /auth/login` — OAuth2 password flow, returns a JWT
- `POST /forms` — create a submission (auth required)
- `GET /forms` — list the current user's submissions (auth required)
