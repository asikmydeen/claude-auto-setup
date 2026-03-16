# Quick Start: priv-django-soft-ui-dashboard-pro-master

## Prerequisites
- Python 3.8+
- pip

## Setup Steps
```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run migrations
python manage.py migrate

# 4. Create admin user
python manage.py createsuperuser

# 5. Start server
python manage.py runserver
```

Access at: http://localhost:8000
Admin at: http://localhost:8000/admin
