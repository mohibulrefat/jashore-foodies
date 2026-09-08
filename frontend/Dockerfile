# syntax=docker/dockerfile:1
FROM node:22-slim

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

WORKDIR /app

# Workspace manifests first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN pnpm install --filter @jashore-foodies/frontend --frozen-lockfile

COPY frontend/ frontend/
WORKDIR /app/frontend

EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]
