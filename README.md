# Plannex – Web application for task scheduling using the PERT method

Plannex is a **web and desktop application** designed to help teams **plan, visualize, and manage tasks** using the **PERT (Program Evaluation and Review Technique)** method.

This monorepo contains both frontend and backend code.

---

## Tech Stack

### Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- D3.js / React Flow (PERT chart visualization)

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Tools & Collaboration

- GitHub → Monorepo hosting
- Jira → Task management
- Figma → UI/UX design
- Postman → API testing
- Jest → Unit and integration testing
- Electron / Tauri → Cross-platform desktop app
- Render → Deployment
- Notion / Overleaf / Google Docs → Documentation and reports

---

## Monorepo Structure

```
plannex/
│
├── frontend/     # React + Vite project with Tailwind & TypeScript
└──backend/      # Node.js + Express backend with Prisma
```

---

## Team Members

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Plannex-org/plannex.git
cd plannex
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:5173/` (Vite default).

### 3. Backend

```bash
cd backend
npm install
node server.js
```

Access the API at `http://localhost:3000/`.

---

## Notes for Team

- **.gitignore**: Node modules, build folders, logs, and environment variables are ignored.

---

## Project Goals

- Create and manage projects and tasks.
- Set task durations using optimistic, pessimistic, and most likely estimates.
- Define dependencies between tasks.
- Automatically generate and visualize the PERT graph.
- Identify the critical path and total project duration.
- Display dynamic charts, including PERT and Gantt diagrams.
- Recalculate schedules in real-time when task changes occur.
- Provide a cross-platform desktop version for offline use.
