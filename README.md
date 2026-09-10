# Jashore Foodies

> [!NOTE]
> **A pet project that taught me full-stack.** 🍜
>
> Originally built during an industry internship / collaboration for my
> university Software Development Lab course. I'm picking it back up to keep it
> alive — and to put AI coding agents (Claude Code, Antigravity, Codex) through
> their paces while I'm at it.

Restaurant discovery, table reservation, and food ordering platform for Jashore.
Customers browse restaurants and menus, reserve tables, and order food; restaurants
manage their menu, tables, and orders; admins approve new restaurants.

## Repository layout

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

| Path        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `frontend/` | React 19 + Vite SPA (Tailwind + DaisyUI)                     |
| `backend/`  | Express + MongoDB REST API (JWT auth, SSLCommerz payments)   |

## Tech stack

- **Frontend:** React 19, Vite 8, React Router 7, TanStack Query 5, Tailwind CSS 4,
  DaisyUI 5, Axios, Swiper
- **Backend:** Node.js, Express 5, MongoDB 7, JSON Web Tokens, MinIO / S3 storage,
  SSLCommerz (sandbox)
- **Hosting:** Frontend as a static site; backend as a container / Node host

## Authentication

First-party email/password auth (no third-party identity provider):

- **Access token** — short-lived JWT, held in memory by the client, sent as
  `Authorization: Bearer`.
- **Refresh token** — long-lived, stored in an httpOnly cookie, rotated on every
  refresh, and revocable (hashes tracked in the `refreshtokens` collection).
- A shared axios instance silently refreshes on `401` and replays the request.
- Roles (`customer` / `restaurant` / `admin`) live in the `accounts` collection;
  route middleware (`requireAuth`, `requireRole`) guards the API and
  `PrivateRoute` / role routes guard the dashboards.
- Create the first admin with
  `pnpm --filter @jashore-foodies/backend seed:admin` (`ADMIN_EMAIL` /
  `ADMIN_PASSWORD`), or `pnpm --filter @jashore-foodies/backend seed` for the
  full demo dataset.

## Image uploads

Images go to S3-compatible object storage (MinIO in dev):

1. The client asks `POST /uploads/presign` for a short-lived presigned `PUT` URL.
2. The browser uploads the file straight to storage — it never passes through the API.
3. The returned public URL (`<S3_PUBLIC_ENDPOINT>/<bucket>/<key>`) is stored on the record.

The bucket is public-read, so stored URLs render directly in `<img>` tags. Configure
with the `S3_*` env vars; any S3 provider works in production.

## Prerequisites

- Node.js >= 20.19 (see `.nvmrc`)
- pnpm >= 9 (`corepack enable` or `npm i -g pnpm`)
- MongoDB (a local instance, an Atlas cluster, or the bundled Docker service)
- S3-compatible object storage (MinIO is bundled in the Docker stack)
- SSLCommerz sandbox credentials (only for the payment flow)

## Setup

```bash
git clone https://github.com/mohibulrefat/jashore-foodies.git
cd jashore-foodies
pnpm install
```

Create the env files from the templates and fill them in:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

| File            | Keys                                                                                   |
| --------------- | ------------------------------------------------------------------------------------- |
| `frontend/.env` | `VITE_API_BASE_URL`                                                                  |
| `backend/.env`  | `MONGODB_URI` or `DB_USER`/`DB_PASS`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`, `S3_*`, `STORE_ID`/`STORE_PASS` |

## Running

```bash
pnpm dev:backend    # API on http://localhost:3000
pnpm dev:frontend   # app on http://localhost:5173
```

## Running with Docker

One command brings up MongoDB, MinIO, the API, and the frontend with hot reload,
**and seeds demo data** (restaurants, menus, tables, images):

```bash
docker compose up   # wait for the seed job to print its summary
```

Open http://localhost:5173 — it's populated and ready to browse.

| Demo login | Credentials |
| ---------- | ----------- |
| Admin | `admin@jashorefoodies.test` / `Admin@123` |
| Customer | `customer@demo.test` / `Demo@123` |
| Restaurant | `spice-villa@demo.test` (and 4 more) / `Demo@123` |
| Restaurant (pending approval) | `green-fork@demo.test` / `Demo@123` |

- Frontend http://localhost:5173 · API http://localhost:3000 · MongoDB `localhost:27017`
- MinIO S3 API http://localhost:9000 · console http://localhost:9001 (`minioadmin` / `minioadmin`)
- The `createbuckets` init service makes the bucket public-read; images are served
  from `http://localhost:9000/<bucket>/...`.
- The `seed` job is idempotent — re-run it with `docker compose run --rm seed`, or
  skip it on `up` with `docker compose up mongo minio createbuckets backend frontend`.
- The stack uses the bundled `mongo` + `minio` services; no external accounts needed.
- JWT secrets and admin/MinIO credentials default to dev values in `docker-compose.yml`.
- Source is bind-mounted, so edits reload live.
- Override ports or secrets with a root `.env` file: `BACKEND_PORT`, `FRONTEND_PORT`,
  `MONGO_PORT`, `MINIO_PORT`, `MINIO_CONSOLE_PORT`, `ACCESS_TOKEN_SECRET`,
  `REFRESH_TOKEN_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `MINIO_ROOT_USER`,
  `MINIO_ROOT_PASSWORD`, `STORE_ID`, `STORE_PASS`.

## Scripts (run from the repo root)

| Command              | Action                                  |
| -------------------- | --------------------------------------- |
| `pnpm dev:frontend`  | Start the Vite dev server               |
| `pnpm dev:backend`   | Start the API with `node --watch`       |
| `pnpm build`         | Build the frontend to `frontend/dist`   |
| `pnpm preview`       | Preview the production frontend build   |
| `pnpm start:backend` | Start the API without watch             |
| `pnpm lint`          | Lint the frontend                       |
| `pnpm format`        | Format the repo with Prettier           |

From `backend/`: `pnpm seed` loads the full demo dataset (idempotent);
`pnpm seed:admin` only creates/updates the admin account.

## Deployment

- **Frontend:** `pnpm build` produces static files in `frontend/dist/`. Serve them
  from any static host with an SPA fallback (all paths rewrite to `/index.html`).
  Set `VITE_API_BASE_URL` to the deployed API before building.
- **Backend:** a standard Node/Express app with a `Dockerfile` — deploy the
  container (or `pnpm --filter @jashore-foodies/backend start`) to any Node host.
  Set the env vars there — in particular `CLIENT_ORIGIN` must be the deployed
  frontend origin so credentialed CORS works, and `NODE_ENV=production` so the
  refresh cookie is `Secure` + `SameSite=None`.

## Branches

`main` is the combined history of the two original repositories. Legacy branches
from before the merge are kept namespaced as `frontend/*` and `backend/*`.
