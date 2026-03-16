# Quick Start: vue-now-ui-dashboard-pro-laravel-master

## Prerequisites
- PHP 8.0+
- Composer
- Node.js 16+ & npm
- MySQL/PostgreSQL

## Setup Steps

### Backend Setup
```bash
cd laravel-json-api-pro
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve  # Runs on localhost:8000
```

### Frontend Setup
```bash
# In project root
npm install
npm run dev  # Runs on localhost:3000 or 8080
```

## Access Points
- Frontend: http://localhost:3000 (or 8080)
- Backend API: http://localhost:8000/api
