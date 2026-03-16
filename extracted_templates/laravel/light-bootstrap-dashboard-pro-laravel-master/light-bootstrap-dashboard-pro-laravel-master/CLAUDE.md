# laravel/laravel

The Laravel Framework.

## Stack
- Laravel ^11.0
- Blade
- PHP ^8.1

## Key Commands
```bash
php artisan serve              # Dev server
php artisan migrate            # Database migrations
php artisan tinker             # REPL
npm run dev                 # Build assets
```

## Important Directories
- `app/` - Application code
- `resources/views/` - Blade templates
- `routes/` - Route definitions
- `database/migrations/` - Database schema

## Conventions
- Controllers: singular, PascalCase (UserController)
- Models: singular, PascalCase (User)
- Routes: plural, kebab-case (/users, /user-profiles)
- Migrations: timestamp prefix
