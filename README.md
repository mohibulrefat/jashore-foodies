# Jashore Foodies

Restaurant discovery, table reservation, and food ordering platform for Jashore.
Customers browse restaurants and menus, reserve tables, and order food; restaurants
manage their menu, tables, and orders; admins approve new restaurants.

## Repository layout

This is a monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces).

| Path        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `frontend/` | React 19 + Vite SPA (Tailwind + DaisyUI, Firebase Auth)      |
| `backend/`  | Express + MongoDB REST API (JWT auth, SSLCommerz payments)   |

## Tech stack

- **Frontend:** React 19, Vite 8, React Router 7, TanStack Query 5, Tailwind CSS 4,
  DaisyUI 5, Firebase Authentication, Axios, Swiper
- **Backend:** Node.js, Express 5, MongoDB 7, JSON Web Tokens, SSLCommerz (sandbox)
- **Hosting:** Frontend on Firebase Hosting, backend on Vercel

## Prerequisites

- Node.js >= 20.19 (see `.nvmrc`)
- pnpm >= 9 (`corepack enable` or `npm i -g pnpm`)
- A MongoDB Atlas database
- A Firebase project with Authentication enabled
- SSLCommerz sandbox credentials

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
| `frontend/.env` | `VITE_FIREBASE_*`, `VITE_API_BASE_URL`, `VITE_ImageBB_token`                          |
| `backend/.env`  | `PORT`, `MONGODB_URI` or `DB_USER`/`DB_PASS`, `ACCESS_TOKEN_SECRET`, `STORE_ID`, `STORE_PASS` |

## Running

```bash
pnpm dev:backend    # API on http://localhost:3000
pnpm dev:frontend   # app on http://localhost:5173
```

## Running with Docker

Brings up MongoDB, the API, and the frontend with hot reload:

```bash
cp frontend/.env.example frontend/.env   # fill in Firebase + imgbb keys
docker compose up
```

- Frontend: http://localhost:5173 · API: http://localhost:3000 · MongoDB: `localhost:27017`
- The API uses the bundled `mongo` service (`MONGODB_URI` is set by Compose); no Atlas needed.
- Source is bind-mounted, so edits reload live.
- Override ports or secrets with a root `.env` file: `BACKEND_PORT`, `FRONTEND_PORT`,
  `MONGO_PORT`, `ACCESS_TOKEN_SECRET`, `STORE_ID`, `STORE_PASS`.

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

## Deployment

- **Frontend:** `pnpm build`, then `firebase deploy` from `frontend/`.
- **Backend:** pushed to Vercel (`backend/vercel.json`). Set the same env vars in
  the Vercel project settings.

## Branches

`main` is the combined history of the two original repositories. Legacy branches
from before the merge are kept namespaced as `frontend/*` and `backend/*`.
