# Argon Dashboard PRO React + Node.js

## Overview
Full-stack monorepo with React frontend and Node.js backend. Argon Design System dashboard with MongoDB authentication API.

## Tech Stack
### Frontend (`/frontend`)
- **Framework**: React 17.0.2 with Create React App
- **UI**: Reactstrap (Bootstrap 4.6), Argon Design System
- **Router**: React Router 5.2
- **Charts**: Chart.js with react-chartjs-2
- **Forms**: React Datetime, React Select2, Quill editor
- **Tables**: React Bootstrap Table 2
- **HTTP**: Axios
- **Styles**: SASS with node-sass

### Backend (`/backend`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (jsonwebtoken) + Passport JWT
- **Password**: bcrypt-nodejs
- **Email**: Nodemailer
- **Scheduler**: node-cron
- **Security**: CORS, compression, dotenv

## Directory Structure
```
/
├── frontend/           # React app (CRA)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── views/       # Page views
│   │   ├── layouts/     # Layout components
│   │   └── assets/      # SCSS, images, fonts
│   └── package.json
├── backend/            # Node.js API
│   ├── app.js          # Express app
│   ├── routes/         # API routes
│   ├── models/         # Mongoose models
│   ├── controllers/    # Route handlers
│   └── package.json
└── README.md
```

## Key Features
### Frontend
- Full calendar (@fullcalendar)
- Chart.js dashboards
- Rich text editor (Quill via react-quill)
- Drag & drop (dropzone)
- Data tables with pagination, sorting, filtering
- SweetAlert notifications
- Perfect Scrollbar
- JVector maps
- Print functionality

### Backend
- JWT-based authentication
- Passport strategies
- MongoDB schemas with validators
- Email notifications
- Cron jobs
- CORS-enabled API
- RESTful endpoints

## Commands
### Frontend
```bash
cd frontend
npm install
npm start           # Dev server (port 3000)
npm run build       # Production build
npm test            # Run tests
npm run build:scss  # Compile SASS
```

### Backend
```bash
cd backend
npm install
npm start           # Start API with nodemon
```

## Development Workflow
1. Install frontend: `cd frontend && npm install`
2. Install backend: `cd backend && npm install`
3. Configure backend `.env` (MongoDB URI, JWT secret)
4. Start backend: `cd backend && npm start`
5. Start frontend: `cd frontend && npm start`
6. Frontend proxies API calls to backend

## Authentication Flow
- Backend: JWT tokens, Passport JWT strategy
- Frontend: Axios interceptors for token attachment
- Login/register endpoints in backend
- Protected routes in React Router

## Styling
- SASS source in `frontend/src/assets/scss/`
- Argon theme variables
- Bootstrap 4.6 with Reactstrap
- Custom components styled with SASS

## Code Quality
- ESLint with React App config
- TypeScript support (devDep)
- Prettier for formatting (backend)
