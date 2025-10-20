# Mini fullstack – React + Express

Liten todo-app for å vise enkel fullstack: React (Vite) i frontend, Express-API i backend. Data lagres i minnet.

## Stack

* **Frontend:** React 18 + Vite
* **Backend:** Node.js + Express + CORS

## Kom i gang

```bash
# Backend (http://localhost:4000)
cd server && npm install && npm run start

# Frontend (http://localhost:5173)
cd ../client && npm install && npm run dev
```

Åpne **[http://localhost:5173](http://localhost:5173)**. Frontend snakker med `http://localhost:4000/api/todos`.

## API

* `GET /api/todos`
* `POST /api/todos` `{ text: string }`
* `PATCH /api/todos/:id` `{ done?: boolean, text?: string }`
* `DELETE /api/todos/:id`

## Struktur

```
mini-fullstack-oppgave/
├─ server/
│  ├─ package.json
│  └─ index.js
└─ client/
   ├─ package.json
   ├─ index.html
   ├─ vite.config.js
   └─ src/
      ├─ main.jsx
      └─ App.jsx
```

## Notater

* CORS er aktivert i backend for lokal utvikling.
* In-memory lagring → data forsvinner ved restart (helt ok for demo).

## Videre

Filtrering (Alle/Aktive/Fullførte), enkel persistens (JSON-fil/SQLite), validering, små komponenter, E2E-test.

## Lisens

MIT.
