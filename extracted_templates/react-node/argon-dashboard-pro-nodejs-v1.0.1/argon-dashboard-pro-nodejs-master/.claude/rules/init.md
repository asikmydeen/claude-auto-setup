# Quick Start - Argon Dashboard PRO Node.js

## Prerequisites
- Node.js >= 12.x
- PostgreSQL database
- Redis server
- PM2 (for production): `npm install -g pm2`

## Setup
```bash
npm install
cp .env.example .env    # Configure database, Redis, secrets
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

## Environment Variables (.env)
```
DATABASE_URL=postgres://user:pass@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
SESSION_SECRET=your-secret-key
PORT=3000
```

## Important
- Requires PostgreSQL and Redis running
- Knex migrations must run before starting
- PM2 handles process management in production
- Gulp compiles assets (SASS → CSS)
