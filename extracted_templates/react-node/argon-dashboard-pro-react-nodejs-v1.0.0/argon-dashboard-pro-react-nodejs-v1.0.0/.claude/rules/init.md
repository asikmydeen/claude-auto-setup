# Quick Start - Argon Dashboard PRO React + Node.js

## Prerequisites
- Node.js >= 14.x
- MongoDB database (local or Atlas)
- npm or yarn

## Setup
```bash
# Backend
cd backend
npm install
cp .env.example .env    # Configure MongoDB URI, JWT secret
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm start
```

## Environment Variables (backend/.env)
```
MONGODB_URI=mongodb://localhost:27017/argon-dashboard
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

## First Run
1. Start MongoDB server
2. Start backend API (port 5000)
3. Start frontend dev server (port 3000)
4. Frontend automatically proxies API to backend
5. Register user via `/auth/register` endpoint

## Important
- Backend must run before frontend
- MongoDB connection required
- JWT tokens for authentication
- Frontend CRA dev server proxies to backend
