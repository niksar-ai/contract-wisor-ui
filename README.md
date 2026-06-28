# Contract Wisor — Web UI

A single-page web client for **Contract Wisor**, a contract management and analysis platform. The app lets users ingest contract documents from a remote file server, organise them by type, browse them through list / table / tree views, and run AI-assisted analyses — with long-running processing surfaced through an embedded Temporal workflow dashboard.

> This repository contains the **frontend only**. It talks to a separate backend API over HTTP (configured via environment variables); the API and AI services are not included here.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/license-Proprietary-red)

---

## Features

- **JWT authentication** — login / register flow; the token is persisted in `localStorage` and attached to every request via an Axios interceptor. Expired sessions (HTTP 401) are caught globally and redirect back to the login page.
- **Contract ingestion over SFTP/FTP** — connect to a remote file server, browse its directory tree, select files, and upload them into the platform mapped to a document type.
- **Multiple contract views** — browse contracts as a **list**, a **table**, a hierarchical **tree** (parent/attachment relationships), and a detailed single-contract view with metadata and related documents.
- **Document type management** — organise contracts under a configurable document-type taxonomy.
- **AI-assisted analyses** — a dedicated section for surfacing automated contract analysis produced by the backend.
- **Workflow monitoring** — the Workflow page embeds the **Temporal** Web UI so users can watch long-running document-processing workflows.
- **Dashboard** — summary widgets and charts (MUI X-Charts) for an at-a-glance overview.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | React 18 (Create React App) |
| Routing | React Router v6 |
| UI | React-Bootstrap + Bootstrap 5, MUI 5, Bootstrap Icons, Font Awesome |
| Charts | MUI X-Charts |
| HTTP | Axios (shared instance with auth + 401 interceptors) |
| Auth | JWT in `localStorage` |
| Deployment | Docker + nginx (serves the static build, reverse-proxies `/api`) |

## Getting started

### Prerequisites
- Node.js 18+ and npm
- A running Contract Wisor backend API (for live data)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.development
#   then edit .env.development to point at your API / Temporal UI

# 3. Start the dev server
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Base URL of the Contract Wisor API. The app appends `/api` paths to this base. |
| `REACT_APP_TEMPORAL_IO_URL` | URL of the Temporal Web UI embedded in the Workflow page. |

See [`.env.example`](./.env.example) for the template. CRA reads `.env.development` for `npm start` and `.env.production` for `npm run build`; never commit real values (the `.gitignore` ignores all `.env*` except the example).

## Available scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode with hot reload. |
| `npm test` | Launch the test runner (React Testing Library). |
| `npm run build` | Produce an optimised production build in `build/`. |

## Deployment

The included `Dockerfile` builds the app and serves the static bundle with nginx. `nginx.conf` reverse-proxies `/api/` to the backend over the internal network, so the browser only ever talks to the UI origin (no CORS, no separate API port).

```bash
docker build -t contract-wisor-ui .
docker run -p 8080:80 contract-wisor-ui
```

## Project structure

```
src/
├── api/          # Axios instance + API wrappers (documents, types, ftp)
├── components/   # Reusable UI: layout, contract widgets, tree/list primitives
├── constants/    # Centralised route URLs
├── pages/        # Route-level screens (auth, dashboard, upload, contracts, workflow)
├── styles/       # Global and component CSS
└── utils/        # Helpers, formatters, loading context
```

## License

Proprietary — © 2026 Niksar AI. All rights reserved. This source is published
for demonstration/portfolio purposes only and may not be reused without prior
written permission. See [`LICENSE`](./LICENSE).
