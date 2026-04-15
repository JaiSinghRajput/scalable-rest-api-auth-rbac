# PrimeTrade Backend (Node.js + TypeScript + Mongoose)

Production-style REST API with authentication, role-based access control, and task management.

## Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT auth
- bcrypt password hashing
- Zod validation
- Pino logging
- Swagger API docs

## Features

- Auth APIs
  - POST /api/v1/auth/register
  - POST /api/v1/auth/login
  - GET /api/v1/auth/profile
- Role-based access control
  - ADMIN can list/delete users
  - USER can only access own tasks
- Task CRUD APIs
  - POST /api/v1/tasks
  - GET /api/v1/tasks
  - GET /api/v1/tasks/:id
  - PUT /api/v1/tasks/:id
  - DELETE /api/v1/tasks/:id
- Security
  - Helmet
  - CORS whitelist
  - Rate limiting
  - Mongo query sanitization

## Folder Structure

server/
- src/
  - config/
  - middlewares/
  - modules/
    - auth/
    - user/
    - task/
  - routes/
  - scripts/
  - utils/
  - app.ts
  - server.ts

## Environment Variables

Copy `.env.example` to `.env`.

Required:
- NODE_ENV
- PORT
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- CORS_ORIGIN
- ADMIN_KEY

Optional (admin seed script):
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_NAME

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Start MongoDB locally or provide Atlas URI in `.env`

3. Run dev server

```bash
npx ts-node-dev --respawn --transpile-only --files --ignore-watch node_modules src/server.ts
```

4. Build

```bash
npx tsc -p tsconfig.json
```

5. Start production build

```bash
node dist/server.js
```

## Swagger

- URL: `http://localhost:5000/api-docs`

## Postman

Import `postman_collection.json` from this folder.
