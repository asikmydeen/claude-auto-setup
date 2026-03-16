# Project Intelligence: laravel/laravel

## Overview
- **Project**: laravel/laravel
- **Type**: Laravel Dashboard Application
- **Frontend**: Livewire
- **Laravel**: ^11.0
- **PHP**: ^8.1

## Tech Stack
- **Backend**: Laravel (PHP)
- **Frontend**: Livewire + Vue.js/Mix
- **Database**: MySQL/PostgreSQL (via Eloquent ORM)
- **Authentication**: Laravel Sanctum/Breeze

## Directory Structure
```
app/               - Application code (Models, Controllers, Services)
  Http/Controllers - HTTP controllers
  Models/         - Eloquent models
resources/
  views/          - Blade templates
  js/             - JavaScript assets
  css/            - CSS/SCSS assets
routes/           - Route definitions (web.php, api.php)
database/
  migrations/     - Database migrations
  seeders/        - Database seeders
config/           - Configuration files
public/           - Public assets, entry point (index.php)
storage/          - Logs, cache, uploads
tests/            - PHPUnit tests
```

## Key Dependencies
- Laravel Framework: ^11.0
- Livewire: Frontend rendering
- Laravel Mix/Vite: Asset compilation

## Commands

### Development
```bash
php artisan serve              # Start dev server (localhost:8000)
php artisan migrate            # Run migrations
php artisan db:seed            # Seed database
php artisan tinker             # Interactive REPL
```

### Build
```bash
composer install               # Install PHP dependencies
npm install && npm run dev  # Install and build assets
php artisan key:generate       # Generate app key
php artisan config:cache       # Cache configuration
```

### Testing
```bash
php artisan test               # Run PHPUnit tests
vendor/bin/phpunit             # Alternative test runner
```

## Known Patterns
- Controllers in `app/Http/Controllers/`
- Models use Eloquent ORM
- Routes defined in `routes/web.php` and `routes/api.php`
- Migrations follow Laravel timestamp naming
- Environment config in `.env` file
