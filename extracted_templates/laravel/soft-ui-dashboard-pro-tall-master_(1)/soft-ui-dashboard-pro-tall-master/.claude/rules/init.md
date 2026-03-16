# Quick Start: laravel/laravel

## Prerequisites
- PHP ^8.0.2
- Composer
- Node.js 16+ & npm
- MySQL/PostgreSQL

## Setup Steps
```bash
# 1. Install dependencies
composer install
npm install

# 2. Environment setup
cp .env.example .env
php artisan key:generate

# 3. Configure database in .env
# DB_CONNECTION=mysql
# DB_DATABASE=your_db_name

# 4. Run migrations
php artisan migrate --seed

# 5. Start server
php artisan serve
npm run dev  # In another terminal
```

Access at: http://localhost:8000
