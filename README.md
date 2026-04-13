# ForestAI

Full-stack web application built with React, Express, and PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/download/)

## Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd forestai
```

### 2. Create the database

```bash
psql -U postgres -d postgres -c "CREATE DATABASE forestai;"
```

### 3. Server

```bash
cd server
npm install
cp .env.example .env
```

Update `server/.env` with your PostgreSQL credentials:

```
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/forestai"
```

Run migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:3000`.

### 4. Client

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`.

## Tech Stack

- **Client:** React, TypeScript, Vite, Tailwind CSS, Redux Toolkit (RTK Query)
- **Server:** Express, TypeScript, Prisma, PostgreSQL
