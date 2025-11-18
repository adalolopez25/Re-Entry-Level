# Full-Stack Authentication System – Entry-Level Test

**Live Demo (Frontend):** `https://your-frontend.vercel.app` *(replace with your Vercel link)*  
**Backend API:** `https://your-backend.onrender.com/api/users` *(replace with your Render link)*  
**Repository:** `https://github.com/adalolopez25/Entry-Level-Fullstack-Test/tree/dev`

---

## Overview

A **secure, modern, and responsive** full-stack authentication system built with:

| Layer       | Technology Stack                              |
|------------|-----------------------------------------------|
| **Backend** | Node.js, Express, TypeORM, PostgreSQL, bcrypt |
| **Frontend**| React, TypeScript, Vite, React Router, Tailwind |
| **Auth**    | Session-based (express-session), Cookie-based |

**Key Features Implemented:**
- User registration & login
- Secure profile management (update name, email, password)
- **Password change requires current password**
- Session persistence across page reloads
- Protected routes & automatic redirects
- Professional UI with elegant greeting: **"Welcome, Mr. Andrés"**
- Responsive design (mobile-first)

---

## Why TypeORM Instead of Sequelize?

| Feature               | TypeORM (Chosen)                     | Sequelize (Original)                  |
|-----------------------|--------------------------------------|---------------------------------------|
| TypeScript Support    | Native decorators, zero boilerplate  | Requires extra typing                 |
| Active Record Pattern | Yes (`@Entity`, `@Column`)           | No (DataMapper)                       |
| Development Speed     | Faster with TS                       | More verbose                          |
| Migration Sync        | `synchronize: true` (dev)            | Manual migrations                     |

> **Production-ready note**: In production, use TypeORM CLI for migrations.

---

## Project Structure

Entry-Level-Fullstack-Test/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route logic
│   │   ├── middleware/      # Auth & logging
│   │   ├── models/          # TypeORM User entity
│   │   ├── routes/          # API endpoints
│   │   └── db/              # DataSource config
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/           # Login, Register, Dashboard
│   │   ├── components/      # ProtectedRoute
│   │   └── App.tsx          # Routing & auth logic
│   ├── vite.config.ts
│   └── package.json
└── README.md


---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** (local or cloud)
- **Git**

---

### 1. Clone & Setup

```bash
git clone https://github.com/adalolopez25/Entry-Level-Fullstack-Test.git
cd Entry-Level-Fullstack-Test
git checkout dev

2. Backend Setup

cd backend
cp .env.example .env

Edit .env (use your DB credentials):

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=entry_test_db
PORT=3000
SESSION_SECRET=your-super-secret-key-12345

Install & Run

npm install
npm run dev

Server runs on: http://localhost:3000

3. Frontend Setup

cd ../frontend
npm install
npm run dev

App runs on: http://localhost:5173

API Endpoints

Method,Endpoint,Description,Auth Required
POST,/api/users/register,Register new user,No
POST,/api/users/login,Login → sets session cookie,No
POST,/api/users/logout,Destroy session,Yes
GET,/api/users/profile,Get current user,Yes
PUT,/api/users/profile,Update profile (password needs current),Yes

How to Use (Step-by-Step)

1 - Openhttp://localhost:5173
2 - Register a new account
3 - Login → redirected to /dashboard
4 - Dashboard shows:Welcome, Mr. Andrés
 (First name extracted elegantly)
5 - Update name, email, or password 
 To change password → must enter current password

6 - Logout → back to login
7 - Reload page → session persists

Security Features

Passwords hashed with bcrypt
Session stored in httpOnly, secure cookie
CSRF-safe with sameSite: lax
Input validation (frontend + backend)
No sensitive data in localStorage

UI/UX Highlights

Elegant gradient background
Professional greeting
Clear form labels
Success/error messages
Responsive layout (mobile & desktop)
Smooth hover transitions

Optional Enhancements (Ready to Add)

Feature,Status
Email verification,Planned
Forgot password,Planned
Role-based access,Planned
Docker support,Planned
Unit/E2E tests (Jest),Planned

Deployment (Optional)
Backend → Render / Railway

Connect GitHub repo
Set environment variables
Deploy → get API URL

Frontend → Vercel
vercel --prod

Update frontend/vite.config.ts proxy:
proxy: { '/api': 'https://your-backend.onrender.com' }

Troubleshooting

Issue,Solution
Session not persisting,Ensure withCredentials: true in Axios
CORS error,Backend CORS allows http://localhost:5173
Database not connecting,Check .env DB credentials
Login redirects to login,Clear browser cookies & retry

Author
Andres David Armenta Lopez
Full-Stack Developer | TypeScript Enthusiast
GitHub: @adalolopez25

Ready for production. Built with passion.


---

## STEPS TO SAVE IT IN YOUR PROJECT

1. **Open Visual Studio Code**
2. In the **project root**, right-click → **"New File"**
3. Name it: `README.md`
4. **Select all the text above** (from `# Full-Stack...` to the end)
5. **Paste it into the file**
6. **Save** (`Ctrl + S`)
7. **Upload to GitHub**:

```git add README.md`
git commit -m "docs: add full professional English README"`
git push source developer


## Se cambio todo el proyecto ahora funciona todas las funcionalidades##