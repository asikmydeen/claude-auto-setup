# priv-django-soft-ui-dashboard-pro-master

Django dashboard application

## Stack
- Django 4.2.9
- Python 3.8+

## Key Commands
```bash
python manage.py runserver     # Dev server
python manage.py migrate       # Database migrations
python manage.py shell         # REPL
python manage.py test          # Run tests
```

## Important Directories
- `[app]/models.py` - Database models
- `[app]/views.py` - View logic
- `[app]/templates/` - HTML templates
- `[app]/static/` - Static assets

## Conventions
- Models: singular, PascalCase (User)
- Views: lowercase with underscores (user_list)
- URLs: plural, kebab-case (/users/, /user-profiles/)
- Templates: lowercase with underscores
