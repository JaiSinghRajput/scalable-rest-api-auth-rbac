# Scalability Notes

## 1. Microservices Split Strategy

Current modules (`auth`, `user`, `task`) can be split into separate services:
- Auth service: login, token issuance, profile identity
- User service: user management, role admin operations
- Task service: task CRUD and filtering

Use API Gateway/BFF for route aggregation, auth, and rate-limiting.

## 2. Redis Caching Strategy

- Cache frequently accessed read endpoints:
  - user profile by userId
  - admin task list query snapshots (short TTL)
- Cache key examples:
  - `profile:{userId}`
  - `tasks:{role}:{userId}:{queryHash}`
- Invalidate keys on task create/update/delete and profile updates.

## 3. Queue System (BullMQ / RabbitMQ)

Offload background jobs:
- Welcome email after register
- Audit logs processing
- Periodic task reminders
- Analytics aggregation

BullMQ with Redis is a good fit for Node workloads with retries and delayed jobs.

## 4. Horizontal Scaling

- Run multiple stateless API instances behind Nginx/Cloud Load Balancer.
- Use JWT so session state remains stateless.
- Use shared Redis for distributed rate-limit store and cache.
- Add health checks and auto-scaling rules by CPU/RPS.

## 5. CDN for Frontend

- Host frontend on Vercel/Netlify with global edge CDN.
- Cache static assets aggressively with content hashes.
- Route API calls to backend domain over HTTPS.

## 6. Database Indexing Strategy

Current/Recommended indexes:
- `users.email` unique index
- `users.role` index
- `tasks.userId` index
- `tasks.status` index
- `tasks.priority` index
- Composite `tasks.userId + createdAt` for user feed

As data grows:
- Add text index on `tasks.title` if full-text search is required.
- Consider pagination with cursor-based pattern over `createdAt` + `_id`.
