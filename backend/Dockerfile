# syntax=docker/dockerfile:1
FROM node:22-slim

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

WORKDIR /app

# Workspace manifests first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN pnpm install --filter @jashore-foodies/backend --frozen-lockfile

COPY backend/ backend/
WORKDIR /app/backend

EXPOSE 3000
CMD ["pnpm", "dev"]
