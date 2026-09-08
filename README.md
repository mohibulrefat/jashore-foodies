# Jashore Foodies

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
- **Backend:** Node.js, Express 5, MongoDB 7, JSON Web Tokens, SSLCommerz (sandbox)
- **Hosting:** Frontend on Firebase Hosting, backend on Vercel

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
  `ADMIN_PASSWORD`).

## Prerequisites

- Node.js >= 20.19 (see `.nvmrc`)
- pnpm >= 9 (`corepack enable` or `npm i -g pnpm`)
- MongoDB (a local instance, an Atlas cluster, or the bundled Docker service)
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
| `frontend/.env` | `VITE_API_BASE_URL`, `VITE_ImageBB_token`                                             |
| `backend/.env`  | `MONGODB_URI` or `DB_USER`/`DB_PASS`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`, `STORE_ID`/`STORE_PASS` |

## Running

```bash
pnpm dev:backend    # API on http://localhost:3000
pnpm dev:frontend   # app on http://localhost:5173
```

## Running with Docker

Brings up MongoDB, the API, and the frontend with hot reload:

```bash
cp frontend/.env.example frontend/.env   # fill in the imgbb key
docker compose up
docker compose exec backend pnpm seed:admin   # first admin (ADMIN_EMAIL/PASSWORD)
```

- Frontend: http://localhost:5173 · API: http://localhost:3000 · MongoDB: `localhost:27017`
- The API uses the bundled `mongo` service (`MONGODB_URI` is set by Compose); no Atlas needed.
- JWT secrets and the admin credentials default to dev values in `docker-compose.yml`.
- Source is bind-mounted, so edits reload live.
- Override ports or secrets with a root `.env` file: `BACKEND_PORT`, `FRONTEND_PORT`,
  `MONGO_PORT`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ADMIN_EMAIL`,
  `ADMIN_PASSWORD`, `STORE_ID`, `STORE_PASS`.

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

From `backend/`, `pnpm seed:admin` creates/updates the admin account.

## Deployment

- **Frontend:** `pnpm build`, then `firebase deploy` from `frontend/` (Firebase
  Hosting only — no Firebase Auth). Set `VITE_API_BASE_URL` to the deployed API.
- **Backend:** pushed to Vercel (`backend/vercel.json`, Root Directory `backend`).
  Set the env vars in the Vercel project — in particular `CLIENT_ORIGIN` must be
  the deployed frontend origin so credentialed CORS works, and `NODE_ENV=production`
  so the refresh cookie is `Secure` + `SameSite=None`.

## Branches

`main` is the combined history of the two original repositories. Legacy branches
from before the merge are kept namespaced as `frontend/*` and `backend/*`.
