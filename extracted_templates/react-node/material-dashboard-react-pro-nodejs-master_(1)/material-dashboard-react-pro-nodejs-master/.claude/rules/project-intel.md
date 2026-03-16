# Material Dashboard React PRO + Node.js

## Overview
Full-stack monorepo with Material Design dashboard (React) and JSON API backend (Node.js). Supports PostgreSQL, MySQL, and MongoDB via Sequelize/Mongoose.

## Tech Stack
### Frontend (`/material-dashboard-react-pro`)
- **Framework**: React 18.0 with Create React App
- **UI**: Material-UI (MUI) 5.14 with Emotion styling
- **Router**: React Router DOM 6.2
- **Charts**: Chart.js 4.4 with react-chartjs-2
- **Forms**: Formik 2.4 + Yup validation
- **Calendar**: FullCalendar 6.x
- **Tables**: React Table 7.8
- **Maps**: React JVector Map
- **Auth**: CASL ability-based authorization
- **Styles**: Emotion CSS-in-JS

### Backend (`/node-api-pro`)
- **Framework**: Express.js with ESM modules
- **Databases**:
  - PostgreSQL (Sequelize)
  - MySQL (Sequelize)
  - MongoDB (Mongoose)
- **Auth**: JWT + Passport (JWT & local strategies)
- **Password**: bcrypt
- **Email**: Nodemailer
- **Upload**: Multer (file uploads)
- **Scheduler**: node-cron
- **ORM**: Sequelize 6.20 / Mongoose 6.5

## Directory Structure
```
/
├── material-dashboard-react-pro/  # React frontend
│   ├── src/
│   │   ├── layouts/        # Layout components
│   │   ├── components/     # Reusable components
│   │   ├── assets/         # Images, themes
│   │   └── examples/       # Example pages
│   └── package.json
├── node-api-pro/              # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── models/         # Sequelize/Mongoose models
│   │   ├── controllers/    # Business logic
│   │   ├── middlewares/    # Auth, validation
│   │   ├── config/         # DB configs
│   │   ├── sequelize/      # Migrations, seeders
│   │   └── mongoose/       # Mongoose schemas, seeds
│   └── package.json
└── README.md
```

## Key Features
### Frontend
- Material Design 2 PRO theme
- FullCalendar with multiple views
- Kanban board (@asseinfo/react-kanban)
- Rich text editor (React Quill)
- Date pickers (MUI X Date Pickers)
- Dropzone file upload
- Chart.js dashboards
- CASL permission system
- Responsive MUI components
- RTL support (stylis-plugin-rtl)

### Backend
- Multi-database support (switch via config)
- RESTful JSON API
- JWT authentication
- Passport strategies
- Sequelize migrations & seeds
- Mongoose schemas & seeds
- File upload handling
- Email notifications
- Cron jobs
- UUID generation

## Commands
### Frontend
```bash
cd material-dashboard-react-pro
npm install --legacy-peer-deps
npm start                # Dev server (port 3000)
npm run build            # Production build
npm test                 # Run tests
npm run install:clean    # Clean install
```

### Backend
```bash
cd node-api-pro
npm install
npm run start:dev        # Start with nodemon + babel-node
npm run seed             # Seed database (Mongoose)
npm run clear            # Clear databases
```

## Database Setup
1. Choose database: PostgreSQL, MySQL, or MongoDB
2. Configure `node-api-pro/src/config/` for your DB
3. For Sequelize (PG/MySQL): Run migrations via sequelize-cli
4. For Mongoose (MongoDB): `npm run seed`

## Development Workflow
1. Install frontend: `cd material-dashboard-react-pro && npm install --legacy-peer-deps`
2. Install backend: `cd node-api-pro && npm install`
3. Configure backend database in `src/config/`
4. Seed database: `npm run seed` (if using MongoDB)
5. Start backend: `npm run start:dev`
6. Start frontend: `npm start` (proxies to backend)

## Authentication
- JWT tokens via jsonwebtoken
- Passport JWT + local strategies
- CASL ability-based permissions in frontend
- Protected routes and components

## Styling
- Material-UI 5 with Emotion
- Theme customization via MUI theming
- RTL support built-in
- Responsive design

## Code Quality
- ESLint with Airbnb + React configs
- Prettier formatting
- Jest + Testing Library (frontend)
- Babel transpilation (backend)

## Node Requirements
- Node.js 14, 15, 16, or 18
- npm >= 6
