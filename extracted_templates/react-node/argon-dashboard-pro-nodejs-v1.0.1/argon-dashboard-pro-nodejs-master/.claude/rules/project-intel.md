# Argon Dashboard PRO Node.js

## Overview
Full-stack Node.js dashboard template based on Argon Design System by Creative Tim. Server-side rendered with EJS templates, built with Express, PostgreSQL/Knex, Redis sessions, and Passport authentication.

## Tech Stack
- **Backend**: Node.js with Express.js ~4.16
- **Database**: PostgreSQL with Knex.js 0.16
- **Sessions**: Redis with connect-redis
- **Auth**: Passport.js (local strategy) with bcrypt
- **Templates**: EJS with express-ejs-layouts
- **Build**: Gulp 4.0 (SASS, minify, autoprefixer)
- **Process Manager**: PM2 with ecosystem.config.js
- **Validation**: Joi 14.x

## Key Dependencies
- express, express-session, express-ejs-layouts
- passport, passport-local, bcrypt
- knex, pg (PostgreSQL client)
- connect-redis (session store)
- pino (structured logging)
- gulp + plugins (build pipeline)
- browser-sync (live reload)

## Directory Structure
```
/
├── routes/          # Express route handlers
├── views/           # EJS templates
├── public/          # Static assets (compiled)
├── src/             # Source SCSS, JS
├── db/              # Knex migrations, seeds, knexfile
├── bin/www          # Server entry point
├── app.js           # Express app config
├── gulpfile.js      # Build tasks
└── ecosystem.config.js  # PM2 configuration
```

## Key Files
- `app.js` - Express app setup, middleware, routes
- `bin/www` - HTTP server startup
- `db/knexfile.js` - Database configuration
- `ecosystem.config.js` - PM2 process management
- `gulpfile.js` - Asset build pipeline

## Commands
```bash
npm install              # Install dependencies
npm start                # Start server (production)
npm run dev              # Start with PM2 + Gulp watch
npm run pm2              # Access PM2 commands
npm run gulp             # Run Gulp build
npm run monitor          # Monitor PM2 processes
npm run stop             # Stop PM2 processes
npm run knex             # Run Knex migrations/seeds
```

## Database Setup
1. Create PostgreSQL database
2. Configure `.env` with database credentials
3. Run migrations: `npm run knex migrate:latest`
4. Run seeds: `npm run knex seed:run`

## Development Workflow
1. Install dependencies: `npm install`
2. Configure `.env` (DATABASE_URL, REDIS_URL, SESSION_SECRET)
3. Run migrations and seeds
4. Start dev server: `npm run dev` (PM2 + Gulp + BrowserSync)
5. Access at configured port (default: 3000)

## Authentication
- Passport.js with local strategy
- bcrypt password hashing
- Redis-backed sessions
- Protected routes via middleware

## Build Pipeline
- Gulp compiles SASS to CSS
- Autoprefixer for vendor prefixes
- Minification for CSS/JS
- Image optimization
- BrowserSync for live reload

## Code Quality
- ESLint with Airbnb config
- Prettier for formatting
- Husky + lint-staged (pre-commit hooks)
- Stylelint for CSS
