# Project Intelligence: vue-argon-dashboard-pro-laravel-bs4-master

## Overview
- **Project**: vue-argon-dashboard-pro-laravel-bs4-master
- **Type**: Vue + Laravel Fullstack Dashboard
- **Frontend**: Vue
- **Backend**: Laravel API
- **Laravel**: ^9.0

## Tech Stack
- **Frontend**: Vue (SPA in root)
- **Backend**: Laravel JSON:API (in `laravel-json-api-pro/`)
- **API**: RESTful JSON:API specification
- **Database**: MySQL/PostgreSQL

## Directory Structure
```
[root]/            - Vue frontend app
  src/             - Source code
  components/      - Vue/React components
  pages/           - Page components
  router/          - Route definitions
  store/           - State management (Vuex/Redux)
  package.json     - Frontend dependencies

laravel-json-api-pro/  - Laravel backend API
  app/
    Http/Controllers - API controllers
    Models/         - Eloquent models
  routes/api.php    - API routes
  database/migrations - Database migrations
  composer.json     - Backend dependencies
```

## Key Dependencies
- **Frontend**: Vue, Axios, Vue Router/React Router
- **Backend**: Laravel ^9.0, JSON:API

## Commands

### Frontend Development
```bash
npm install                    # Install frontend dependencies
npm run dev                    # Start dev server
npm run build                  # Build for production
```

### Backend Development
```bash
cd laravel-json-api-pro
composer install               # Install backend dependencies
php artisan serve              # Start API server (localhost:8000)
php artisan migrate            # Run migrations
php artisan db:seed            # Seed database
```

### Testing
```bash
npm run test                   # Frontend tests
cd laravel-json-api-pro && php artisan test  # Backend tests
```

## Known Patterns
- Frontend consumes API via Axios
- Backend follows JSON:API specification
- API endpoints in `laravel-json-api-pro/routes/api.php`
- Frontend state managed by Vuex/Redux
- CORS configured in Laravel backend
