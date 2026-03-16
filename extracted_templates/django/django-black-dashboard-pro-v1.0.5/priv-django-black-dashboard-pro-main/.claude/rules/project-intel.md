# Project Intelligence: priv-django-black-dashboard-pro-main

## Overview
- **Project**: priv-django-black-dashboard-pro-main
- **Type**: Django Dashboard Application
- **Django**: 4.2.9
- **Python**: 3.8+

## Tech Stack
- **Backend**: Django (Python)
- **Database**: SQLite/PostgreSQL
- **Templates**: Django Templates
- **Admin**: Django Admin

## Directory Structure
```
manage.py          - Django management script
[app_name]/        - Django app(s)
  models.py        - Database models
  views.py         - View functions/classes
  urls.py          - URL routing
  admin.py         - Admin site config
  templates/       - HTML templates
  static/          - Static files (CSS, JS, images)
[project_name]/    - Project settings
  settings.py      - Configuration
  urls.py          - Root URL config
  wsgi.py          - WSGI entry point
```

## Key Dependencies
- Django: 4.2.9

## Commands

### Development
```bash
python manage.py runserver     # Start dev server (localhost:8000)
python manage.py migrate       # Apply migrations
python manage.py createsuperuser  # Create admin user
python manage.py shell         # Interactive Python shell
```

### Build
```bash
pip install -r requirements.txt  # Install dependencies
python manage.py collectstatic   # Collect static files
python manage.py makemigrations  # Create migrations
```

### Testing
```bash
python manage.py test          # Run tests
```

## Known Patterns
- Views in `views.py` or `views/` directory
- Models use Django ORM
- URL patterns in `urls.py`
- Templates in `templates/` directory
- Static files in `static/` directory
