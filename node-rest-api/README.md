# node-rest-api

Express 5 REST API skeleton (ESM, Node 20.6+).

```bash
cp .env.example .env
npm install
npm run dev     # watch mode
npm test        # node:test + supertest
```

## Layout
```
src/
  app.js            # express app + middleware
  server.js         # entry, graceful shutdown
  config/           # env config
  routes/           # route definitions (/api/v1/...)
  controllers/      # request/response handling
  services/         # business logic (in-memory store for now)
  middlewares/      # notFound, errorHandler
  utils/AppError.js # throw with status code
tests/
```

## Endpoints
- `GET /health`
- `GET|POST /api/v1/users`
- `GET|PUT|DELETE /api/v1/users/:id`
