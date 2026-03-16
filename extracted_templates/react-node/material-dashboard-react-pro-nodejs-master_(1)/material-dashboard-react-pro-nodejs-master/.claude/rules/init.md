# Quick Start - Material Dashboard React PRO + Node.js

## Prerequisites
- Node.js 14, 15, 16, or 18
- Database: PostgreSQL, MySQL, or MongoDB
- npm >= 6

## Setup
```bash
# Frontend
cd material-dashboard-react-pro
npm install --legacy-peer-deps
npm start

# Backend (in new terminal)
cd node-api-pro
npm install
# Configure database in src/config/
npm run seed           # If using MongoDB
npm run start:dev
```

## Database Configuration
Edit `node-api-pro/src/config/`:
- `config.js` - Choose database type
- `database.sequelize.js` - PostgreSQL/MySQL
- `database.mongoose.js` - MongoDB

## First Run
1. Choose and configure database
2. Start backend API (port from config)
3. Seed data: `npm run seed` (MongoDB) or sequelize migrations (PG/MySQL)
4. Start frontend dev server (port 3000)
5. Frontend proxies API to backend

## Important
- Use `--legacy-peer-deps` for frontend install
- Backend uses ESM modules (type: "module")
- Multi-database support via configuration
- Requires Node.js 14-18
