FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

# Picked up automatically by BuildKit from the host's proxy env vars, if set.
ARG http_proxy
ARG https_proxy
ARG no_proxy

COPY pyproject.toml ./
RUN uv sync

COPY app ./app

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
