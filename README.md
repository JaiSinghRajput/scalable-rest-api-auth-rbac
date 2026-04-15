# PrimeTrade Assignment

Production-style full-stack task manager built with a TypeScript Express API and a React + Vite frontend.

## Overview

The repository is split into two apps:

- `server/` for the REST API, authentication, RBAC, validation, and Swagger docs
- `web/` for the React UI used to register, log in, and manage tasks

## Tech Stack

- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, Zod, Pino, Swagger
- Frontend: React 19, Vite, TypeScript, Axios, React Router, Tailwind CSS, Radix UI, Sonner

## Setup

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` with the required values below, then start the API:

```bash
npm run dev
```

### Frontend

```bash
cd web
npm install
```

Start the client:

```bash
npm run dev
```

## Environment Variables

### `server/.env`

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `ADMIN_EMAIL` optional
- `ADMIN_PASSWORD` optional
- `ADMIN_NAME` optional

### `web/.env`

- `VITE_API_BASE_URL` optional, defaults to `http://localhost:5000`

## Run Locally

1. Start MongoDB locally or point `MONGO_URI` at a hosted database.
2. Run the backend from `server/`.
3. Run the frontend from `web/`.
4. Open the client in your browser and log in or register a user.

## API Endpoints

Base path: `/api/v1`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile`

### Users

- `GET /users` admin only
- `DELETE /users/:id` admin only

### Tasks

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

Swagger UI is available at `/api-docs` on the backend.

## Screenshots

Add product screenshots here when preparing the final submission.


## Notes

- Authentication uses JWT bearer tokens.
- Task and user access is controlled through role-based authorization.
- The frontend stores the token and automatically attaches it to API requests.