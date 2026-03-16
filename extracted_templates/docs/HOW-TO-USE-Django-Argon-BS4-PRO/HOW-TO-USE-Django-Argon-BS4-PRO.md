# Django Argon PRO

Django starter styled with **Argon Dashboard PRO**, a premium `Bootstrap 4` design from `Creative-Tim`. 
The product is designed to deliver the best possible user experience with highly customizable feature-rich pages.

> **YOUR ACCESS TOKEN**: `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`

**IMPORTANT**: DON'T SHARE this TOKEN with anyone and don't save it on GitHUB or GitLab (becomes automatically invalidated).   

<br /> 

## Features: 

- ✅ `Up-to-date Dependencies`
- ✅ `Design`: [Django Theme Argon](https://github.com/app-generator/django-admin-argon-pro) - `PRO Version`
- ✅ `Sections` covered by the design:
  - ✅ **Admin section** (reserved for superusers)
  - ✅ **Authentication**: `Django.contrib.AUTH`, Registration
  - ✅ **All Pages** available in for ordinary users 
- ✅ `Docker`
- 🚀 `Deployment` 
  - `CI/CD` flow via `Render`

<br /> 

## How to use the product 

> 👉 Export `GITHUB_TOKEN` in the environment: 

```bash
$ export GITHUB_TOKEN='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'  # for Linux, Mac      !!! Don't SHARE it or save it on GitHub !!!
$ set GITHUB_TOKEN='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'     # Windows CMD         !!! Don't SHARE it or save it on GitHub !!!
$ $env:GITHUB_TOKEN = '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'  # Windows powerShell  !!! Don't SHARE it or save it on GitHub !!!
```

This is required because the project has a private REPO dependency: `github.com/app-generator/priv-django-admin-argon-pro`

> 👉 Clone the sample project

```bash
$ git clone https://github.com/app-generator/django-argon-dashboard-pro.git
$ cd django-argon-dashboard-pro
```

> 👉 Follow the instructions provided by the [README](https://github.com/app-generator/django-argon-dashboard-pro)

```bash
$ # Instal dependencies 
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
$ 
$ # Set Up Database
$ python manage.py makemigrations
$ python manage.py migrate
$
$ # Create SuperUser
$ python manage.py createsuperuser
$
$ # Start Server
$ python manage.py runserver
```

At this point, the app runs at `http://127.0.0.1:8000/`.

## Deploy on [Render](https://render.com/)

- Create a Blueprint instance
  - Go to https://dashboard.render.com/blueprints this link.
- Click `New Blueprint Instance` button.
- Connect your `repo` which you want to deploy.
- Fill the `Service Group Name` and click on `Update Existing Resources` button.
- After that your deployment will start automatically.

At this point, the product should be LIVE.

<br />

---
[Django Argon PRO](https://appseed.us/product/argon-dashboard-pro/django/) - **Django** starter provided by **[AppSeed](https://appseed.us/)**
