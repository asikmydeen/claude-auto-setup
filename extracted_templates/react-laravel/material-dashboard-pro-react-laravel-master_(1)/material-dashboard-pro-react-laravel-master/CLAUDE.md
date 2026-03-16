# material-dashboard-pro-react-laravel-master

React-Laravel + Laravel fullstack dashboard

## Stack
- Frontend: React
- Backend: Laravel ^11.0 API
- API Spec: JSON:API

## Key Commands

### Frontend
```bash
npm run dev                    # Dev server
npm run build                  # Production build
npm run test                   # Run tests
```

### Backend
```bash
cd laravel-json-api-pro
php artisan serve              # API server
php artisan migrate            # Migrations
```

## Important Directories
- `src/` - React source code
- `laravel-json-api-pro/` - Laravel API backend
- `laravel-json-api-pro/app/` - API logic
- `laravel-json-api-pro/routes/api.php` - API routes

## Conventions
- API follows JSON:API specification
- Frontend uses Axios for API calls
- Backend endpoints: `/api/v1/...`
- Component names: PascalCase
