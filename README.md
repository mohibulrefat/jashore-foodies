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

## Quick start

```bash
git clone https://github.com/mohibulrefat/jashore-foodies.git
cd jashore-foodies
docker compose up          # wait for the seed job to print its summary
```

Open **http://localhost:5173** — it comes seeded with restaurants, menus, tables
and images, ready to browse. Sign in with any demo account below.

| Demo login | Credentials |
| ---------- | ----------- |
| Admin | `admin@jashorefoodies.test` / `Admin@123` |
| Customer | `customer@demo.test` / `Demo@123` |
| Restaurant | `spice-villa@demo.test` (and 4 more) / `Demo@123` |
| Restaurant (pending approval) | `green-fork@demo.test` / `Demo@123` |

> All credentials, JWT secrets and MinIO keys in `docker-compose.yml` are
> **dev-only defaults** — override every one of them for any real deployment.

## Tech stack

- **Frontend:** React 19, Vite 8, React Router 7, TanStack Query 5, Tailwind CSS 4,
  DaisyUI 5, Axios, Swiper
- **Backend:** Node.js, Express 5, MongoDB 7, JSON Web Tokens, MinIO / S3 storage,
  SSLCommerz (sandbox)
- **Dev infra:** Docker Compose (MongoDB, MinIO, API, frontend + a one-shot seed job)
- **Hosting:** Frontend as a static site; backend as a container / Node host

## Repository layout

A monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

```
frontend/                 React 19 + Vite SPA (Tailwind + DaisyUI)
  src/
    lib/api.js            single axios instance (baseURL + credentials + refresh interceptor)
    provider/             AuthProvider + AuthContext
    routes/               router + PrivateRoute / role guards
    hooks/  pages/  Dashborad/  layout/  components/
backend/                  Express + MongoDB REST API
  index.js                thin entry: connect db, start server
  src/
    config.js  db.js  app.js
    lib/       tokens, storage (S3 presign + server upload), ApiError, asyncHandler
    middleware/ auth (requireAuth / requireRole), error
    routes/    auth, uploads, customer, restaurant, admin, payment, public
  scripts/     seed.js (full demo data), seedAdmin.js, lib/images.js
docker-compose.yml        mongo · minio · createbuckets · backend · seed · frontend
```

## Authentication

First-party email/password auth (no third-party identity provider):

- **Access token** — short-lived JWT, held in memory by the client, sent as
  `Authorization: Bearer`.
- **Refresh token** — long-lived, stored in an httpOnly cookie, rotated on every
  refresh, and revocable (hashes tracked in the `refreshtokens` collection).
- A shared axios instance silently refreshes on `401` and replays the request.
- Roles (`customer` / `restaurant` / `admin`) live in the `accounts` collection;
  `requireAuth` / `requireRole` guard the API and `PrivateRoute` / role routes
  guard the dashboards.
- Create the first admin with `pnpm --filter @jashore-foodies/backend seed:admin`
  (`ADMIN_EMAIL` / `ADMIN_PASSWORD`), or `... seed` for the full demo dataset.

## API surface

| Prefix | Guard | Purpose |
| ------ | ----- | ------- |
| `/auth/*` | — / bearer | register, login, refresh, logout, logout-all, me, change-password |
| `/uploads/presign` | — | presigned `PUT` URL for direct-to-storage image upload |
| `/customer/*` | `requireAuth` | cart, orders, reservations, payment history (self-scoped) |
| `/restaurant/*` | `requireRole("restaurant")` | menu items, tables, incoming orders & reservations |
| `/admin/*` | `requireRole("admin")` | pending restaurants, approvals, dashboard counts |
| `/reservepayment`, `/foodpayment` | `requireAuth` | SSLCommerz checkout (+ public gateway callbacks) |
| `/allitems`, `/allrestaurants`, `/offers`, `/trending`, … | — | public reads |

## Image uploads

Images go to S3-compatible object storage (MinIO in dev):

1. The client asks `POST /uploads/presign` for a short-lived presigned `PUT` URL.
2. The browser uploads the file straight to storage — it never passes through the API.
3. The returned public URL (`<S3_PUBLIC_ENDPOINT>/<bucket>/<key>`) is stored on the record.

The bucket is public-read, so stored URLs render directly in `<img>` tags. Configure
with the `S3_*` env vars; any S3 provider works in production.

## Demo seed data

`docker compose up` runs a one-shot `seed` job (`backend/scripts/seed.js`):

- 6 restaurants (5 approved, 1 pending), 25 menu items, 15 tables, a demo customer
- Food photos pulled from [TheMealDB](https://www.themealdb.com/), interiors/avatars
  from [loremflickr](https://loremflickr.com/), all uploaded to MinIO under `seed/`
- Idempotent — clears `{ seed: true }` docs and rebuilds; skips images already uploaded
- Re-run with `docker compose run --rm seed`; skip on `up` with
  `docker compose up mongo minio createbuckets backend frontend`

## Running without Docker

```bash
pnpm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env    # needs MongoDB + an S3/MinIO endpoint
pnpm dev:backend     # API on http://localhost:3000
pnpm dev:frontend    # app on http://localhost:5173
```

| File            | Keys |
| --------------- | ---- |
| `frontend/.env` | `VITE_API_BASE_URL` |
| `backend/.env`  | `MONGODB_URI` (or `DB_USER`/`DB_PASS`), `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`, `S3_*`, `STORE_ID`/`STORE_PASS` |

**Prerequisites:** Node.js >= 20.19 (see `.nvmrc`), pnpm >= 9 (`corepack enable`),
MongoDB, an S3-compatible store, and — for the payment flow only — SSLCommerz
sandbox credentials.

## Compose services & ports

| Service | Port | Notes |
| ------- | ---- | ----- |
| frontend | 5173 | Vite dev server, hot reload |
| backend | 3000 | Express API, `node --watch` |
| mongo | 27017 | `mongo_data` volume |
| minio | 9000 / 9001 | S3 API / console (`minioadmin` / `minioadmin`), `minio_data` volume |
| createbuckets | — | one-shot: create bucket + set public-read |
| seed | — | one-shot: load demo data |

Override with a root `.env`: `BACKEND_PORT`, `FRONTEND_PORT`, `MONGO_PORT`,
`MINIO_PORT`, `MINIO_CONSOLE_PORT`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`,
`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`,
`STORE_ID`, `STORE_PASS`.

## Scripts (repo root)

| Command | Action |
| ------- | ------ |
| `pnpm dev:frontend` / `dev:backend` | start each dev server |
| `pnpm build` / `preview` | build / preview the frontend |
| `pnpm start:backend` | start the API without watch |
| `pnpm lint` | lint the frontend |
| `pnpm format` | format the repo with Prettier |

From `backend/`: `pnpm seed` (full demo dataset, idempotent) · `pnpm seed:admin`
(admin only).

## Deployment

- **Frontend:** `pnpm build` produces static files in `frontend/dist/`. Serve them
  from any static host with an SPA fallback (all paths rewrite to `/index.html`).
  Set `VITE_API_BASE_URL` to the deployed API before building.
- **Backend:** a standard Node/Express app with a `Dockerfile` — deploy the
  container (or `pnpm --filter @jashore-foodies/backend start`) to any Node host.
  Set the env vars there — `CLIENT_ORIGIN` must be the deployed frontend origin so
  credentialed CORS works, and `NODE_ENV=production` so the refresh cookie is
  `Secure` + `SameSite=None`. Point `S3_*` at a real bucket.

## Branches

`main` is the combined history of the two original repositories. Legacy branches
from before the merge are kept namespaced as `frontend/*` and `backend/*`.
