# AI Agent Hosting Platform - Development Roadmap

> **Version:** 2.0  
> **Last Updated:** December 2024  
> **Status:** Ready for Development

---

## 📋 What is This Project?

This is a **complete AI Agent hosting platform** that allows:

- **Admins** to manage multiple AI agents embedded from [surfn.ai](https://surfn.ai)
- **Real-time tracking** of conversations using intelligent web scraping (Puppeteer)
- **Users** to view their agent's conversations in a beautiful chat interface
- Support for **50+ simultaneous conversations**

### How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PLATFORM FLOW                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. Admin creates AGENTS → Assigns to USERS                         │
│                    ↓                                                 │
│  2. Each Agent gets a unique PAGE URL                               │
│                    ↓                                                 │
│  3. Visitors open the Agent page → Chat iframe loads                │
│                    ↓                                                 │
│  4. SCRAPER automatically starts → Captures conversation            │
│                    ↓                                                 │
│  5. Messages saved to DATABASE → User sees them in DASHBOARD        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 (App Router) | Modern React framework with SSR |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | PostgreSQL + Sequelize | Relational database with ORM |
| **Scraper** | Puppeteer | Headless Chrome for capturing chats |
| **Auth** | JWT + Bcrypt | Secure authentication |
| **Scheduler** | Node-cron | Cleanup jobs |

---

## 🚀 Quick Start for New Developers

### Before You Begin

1. **Read** `Application instructions.md` - Contains full specification
2. **Understand** the database schema (4 tables: users, agents, conversations, scraper_sessions)
3. **Know** the API endpoints structure

### Environment Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env  # Configure your database URL

# Frontend
cd frontend
npm install
cp .env.example .env.local  # Set NEXT_PUBLIC_API_URL
```

### Key Files to Know

| File | What It Does |
|------|--------------|
| `backend/src/services/scraperService.js` | **Core feature** - Captures chat messages |
| `backend/src/models/` | Database models (User, Agent, Conversation) |
| `frontend/app/agent/[id]/page.js` | Agent chat page - triggers scraper |
| `frontend/lib/api.js` | Axios instance with JWT interceptors |

---

## 👥 User Roles

| Role | Access | Capabilities |
|------|--------|--------------|
| **Admin** | Full access | Manage all users, agents, view all conversations |
| **User** | Dashboard only | View their assigned agent's conversations |
| **Visitor** | Public agent pages | Chat with agents (no login required) |

---

## 📁 Project Structure Overview

```
ai_agent/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & app configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (scraper!)
│   │   └── utils/          # Helpers, logger
│   └── server.js           # Entry point
│
├── frontend/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── agent/[id]/     # Public chat pages
│   │   └── login/          # Auth page
│   ├── components/         # Reusable UI components
│   └── lib/                # API client, auth helpers
│
└── Application instructions.md  # Full specification
```

---

## Phase 1: Project Setup & Environment Configuration ✅

### 1.1 Initialize Backend Project

- [x] Create `backend/` directory structure
- [x] Initialize Node.js project with `npm init`
- [x] Install core dependencies:
  - `express`, `sequelize`, `pg`, `pg-hstore`
  - `jsonwebtoken`, `bcryptjs`
  - `cors`, `dotenv`, `puppeteer`
  - `node-cron`
- [x] Install dev dependencies: `nodemon`
- [x] Create `.env` file with environment variables

### 1.2 Initialize Frontend Project

- [x] Create Next.js 14 project with App Router
- [x] Install dependencies:
  - `axios`, `react-hot-toast`
  - `tailwindcss`, `postcss`, `autoprefixer`
- [x] Configure Tailwind CSS
- [x] Create `.env.local` with `NEXT_PUBLIC_API_URL`

---

## Phase 2: Database Layer ✅

### 2.1 PostgreSQL Setup

- [x] Set up PostgreSQL database (local or Neon.tech)
- [x] Create connection string

### 2.2 Sequelize Configuration

- [x] Create `src/config/database.js` - Sequelize connection
- [x] Create `src/config/config.js` - App configuration

### 2.3 Database Models

- [x] Create `src/models/User.js`
  - Fields: id, name, email, password, role, is_active, timestamps
- [x] Create `src/models/Agent.js`
  - Fields: id, user_id, agent_name, iframe_code, iframe_url, page_url, page_title, description, status, timestamps
- [x] Create `src/models/Conversation.js`
  - Fields: id, agent_id, user_id, session_id, thread_id, messages (JSONB), visitor_info, message_count, status, timestamps
- [x] Create `src/models/ScraperSession.js`
  - Fields: id, agent_id, session_id, status, error_count, last_error, started_at, completed_at, timestamps
- [x] Create `src/models/index.js` - Model associations and exports
- [x] Run database migrations/sync

### 2.4 Seed Data

- [x] Insert default admin user (<admin@example.com> / admin123)
- [x] Create database indexes for performance

---

## Phase 3: Backend Authentication System ✅

### 3.1 Middleware

- [x] Create `src/middleware/auth.js` - JWT verification
- [x] Create `src/middleware/adminAuth.js` - Admin-only route protection
- [x] Create `src/middleware/errorHandler.js` - Global error handling

### 3.2 Auth Controller & Routes

- [x] Create `src/controllers/authController.js`
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - Register new user (admin only)
  - `GET /api/auth/me` - Get current user info
  - `POST /api/auth/logout` - Logout
- [x] Create `src/routes/auth.js`

---

## Phase 4: Backend User Management (Admin) ✅

### 4.1 User Controller & Routes

- [x] Create `src/controllers/userController.js`
  - `GET /api/users` - Get all users (pagination & search)
  - `GET /api/users/:id` - Get single user
  - `POST /api/users` - Create new user
  - `PUT /api/users/:id` - Update user
  - `DELETE /api/users/:id` - Delete user
  - `GET /api/users/search?q=query` - Search users
- [x] Create `src/routes/users.js`

---

## Phase 5: Backend Agent Management ✅

### 5.1 Agent Controller & Routes

- [x] Create `src/controllers/agentController.js`
  - `GET /api/agents` - Get all agents (pagination)
  - `GET /api/agents/:id` - Get single agent
  - `POST /api/agents` - Create new agent
  - `PUT /api/agents/:id` - Update agent
  - `DELETE /api/agents/:id` - Delete agent
  - `GET /api/agents/user/:userId` - Get user's agents
  - `GET /api/agents/public` - Get all active agents (public)
- [x] Create `src/routes/agents.js`

---

## Phase 6: Backend Conversation Management ✅

### 6.1 Conversation Controller & Routes

- [x] Create `src/controllers/conversationController.js`
  - `GET /api/conversations` - Get all conversations (Admin)
  - `GET /api/conversations/user/:userId` - Get user's conversations
  - `GET /api/conversations/agent/:agentId` - Get agent conversations
  - `GET /api/conversations/:id` - Get single conversation
  - `GET /api/conversations/search?q=query` - Search conversations
- [x] Create `src/routes/conversations.js`

---

## Phase 7: Intelligent Scraper System ✅

### 7.1 Core Scraper Service

- [x] Create `src/services/scraperService.js`
  - Active scrapers Map for concurrent session management
  - `startScraping(agentId, sessionId)` - Initialize scraper
  - `scrapeConversation(agentId, sessionId)` - Main scraping loop
  - `extractMessages(page)` - Parse chat messages from DOM
  - `saveConversation()` - Persist to database
  - `extractIframeUrl(iframeCode)` - Extract URL from iframe
  - `cleanup(sessionId, browser, status)` - Resource cleanup
  - `stopScraping(sessionId)` - Stop specific scraper
  - `getActiveScrapers()` - List active sessions
  - `getStats()` - Scraper statistics

### 7.2 Queue Management

- [x] Create `src/services/queueManager.js`
  - Queue system for concurrent conversations
  - Max concurrent scrapers limit (20)
  - Scraping interval (15 seconds)
  - Timeout handling (10 minutes)

### 7.3 Scraper Controller & Routes

- [x] Create `src/controllers/scraperController.js`
  - `POST /api/scraper/trigger` - Trigger scraping for session
  - `GET /api/scraper/status/:sessionId` - Get scraper status
  - `GET /api/scraper/active` - Get all active scrapers
  - `POST /api/scraper/stop/:sessionId` - Stop specific scraper
  - `GET /api/scraper/stats` - Get scraper statistics
- [x] Create `src/routes/scraper.js`

### 7.4 Cleanup Service

- [x] Create `src/services/cleanupService.js`
  - Hourly cleanup of old sessions (24h+)
  - Daily cleanup of empty conversations (7d+)
  - Cron job scheduling

---

## Phase 8: Backend Server Configuration ✅

### 8.1 Server Entry Point

- [x] Create `src/server.js`
  - Express app configuration
  - CORS setup
  - Route integration
  - Database connection
  - Error handling middleware
  - Server startup

### 8.2 Utilities

- [x] Create `src/utils/logger.js` - Logging utility
- [x] Create `src/utils/helpers.js` - Helper functions

---

## Phase 9: Frontend Core Setup ✅

### 9.1 Layout & Styling

- [x] Create `app/layout.js` - Root layout with Toaster
- [x] Configure `styles/globals.css` with Tailwind

### 9.2 API & Auth Utilities

- [x] Create `lib/api.js` - Axios instance with interceptors
  - Request interceptor for JWT token
  - Response interceptor for 401 handling
- [x] Create `lib/auth.js` - Auth helper functions

### 9.3 Shared Components

- [x] Create `components/Navbar.js`
- [x] Create `components/LoadingSpinner.js`
- [x] Create `components/Pagination.js`
- [x] Create `components/SearchBar.js`
- [x] Create `components/ProtectedRoute.js`
- [x] Create `components/AgentCard.js`
- [x] Create `components/ConversationViewer.js`
- [x] Create `components/AdminSidebar.js`

---

## Phase 10: Frontend Public Pages ✅

### 10.1 Home Page

- [x] Create `app/page.js`
  - Landing page with agent listing
  - Agent cards with links

### 10.2 Login Page

- [x] Create `app/login/page.js`
  - Email/password form
  - JWT token storage
  - Redirect logic based on role

### 10.3 Agent Chat Page

- [x] Create `app/agent/[id]/page.js`
  - Load agent details
  - Generate unique session ID
  - Trigger scraper on page load
  - Embed iframe code
  - Display session info

---

## Phase 11: Frontend Admin Panel ✅

### 11.1 Admin Layout

- [x] Create `app/admin/layout.js` - Admin layout with sidebar
- [x] Create `components/AdminSidebar.js`

### 11.2 Admin Dashboard

- [x] Create `app/admin/page.js`
  - Statistics overview
  - Recent activity
  - Scraper status

### 11.3 User Management Page

- [x] Create `app/admin/users/page.js`
  - Users table with CRUD
  - Create/Edit user modal
  - Search and pagination

### 11.4 Agent Management Page

- [x] Create `app/admin/agents/page.js`
  - Agents table with CRUD
  - Create/Edit agent modal
  - User assignment dropdown
  - Iframe code input
  - Auto-generate page URL

### 11.5 Conversations View

- [x] Create `app/admin/conversations/page.js`
  - All conversations list
  - Filter by agent/user
  - Conversation viewer

---

## Phase 12: Frontend User Dashboard ✅

### 12.1 User Dashboard Layout

- [x] Create `app/dashboard/layout.js`

### 12.2 User Conversations Page

- [x] Create `app/dashboard/page.js`
  - User's conversations list
  - Filter and search
  - Conversation details view

### 12.3 Conversation Viewer Component

- [x] Create `components/ConversationViewer.js`
  - Beautiful chat bubble interface
  - User vs AI message styling
  - Timestamps display
  - Scrollable container

### 12.4 Chat Interface Component

- [x] Create `components/ChatInterface.js`
- [x] Create `components/AgentCard.js`

---

## Phase 13: Testing & Quality Assurance ✅

### 13.1 Backend Testing

- [x] Test admin login with default credentials
- [x] Test user CRUD operations
- [x] Test agent CRUD operations
- [x] Test scraper trigger and status
- [x] Test conversation retrieval

### 13.2 Frontend Testing

- [x] Test login flow and redirects
- [x] Test admin panel functionality
- [x] Test user dashboard
- [x] Test agent chat page
- [x] Test responsive design

### 13.3 Integration Testing

- [x] Test scraper with real surfn.ai iframe
- [x] Test concurrent conversation support (50+)
- [x] Test auto-cleanup services
- [x] Test error handling

---

## Phase 14: Production Preparation ✅

### 14.1 Security Hardening

- [x] Implement rate limiting
- [x] Input validation (frontend & backend)
- [x] Secure password hashing
- [x] Proper session management
- [x] Environment variable security

### 14.2 Performance Optimization

- [x] Database query optimization
- [x] Add proper database indexes
- [x] Frontend performance audit
- [x] Scraper performance monitoring

### 14.3 Error Handling & Logging

- [x] Comprehensive error handling
- [x] Structured logging
- [x] User-friendly error messages

---

## Phase 15: UI Modernization & Localization (i18n) ✅

### 15.1 Multi-language Support

- [x] Create `lib/language.js` context provider
- [x] Create `lib/translations.js` dictionary (English/Arabic)
- [x] Implement Language Toggle button component
- [x] Add RTL support (dynamic `dir` attribute)
- [x] Integrate Cairo font for Arabic language support

### 15.2 UI Overhaul & Polish

- [x] Modernize Login Page (glassmorphism, animations)
- [x] Redesign Admin Dashboard (stats cards, charts)
- [x] Update Admin Sidebar (collapsible, mobile responsive)
- [x] Refine User Profile & Conversations view
- [x] Fix layout issues for RTL alignment

---

## Phase 16: Deployment

### 16.1 Database Deployment (Neon.tech)

- [ ] Create Neon.tech account
- [ ] Create new project
- [ ] Run SQL schema
- [ ] Note connection string

### 16.2 Backend Deployment (Railway.app)

- [ ] Create Railway account
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Deploy and verify

### 16.3 Frontend Deployment (Vercel)

- [ ] Create Vercel account
- [ ] Import from GitHub
- [ ] Set `NEXT_PUBLIC_API_URL`
- [ ] Deploy and verify

### 16.4 Post-Deployment Verification

- [ ] Verify all endpoints working
- [ ] Test complete user flows
- [ ] Monitor scraper performance
- [ ] Check cleanup jobs running

---

## Success Criteria Checklist

- [ ] Complete admin panel with all CRUD operations
- [ ] User dashboard with conversation viewing
- [ ] Real-time scraping with queue management
- [ ] Support for 50+ concurrent conversations
- [ ] Beautiful chat interface for conversation display
- [ ] Fully responsive design
- [ ] Secure authentication system
- [ ] Error handling and notifications
- [ ] Auto-cleanup of old data
- [ ] Production-ready deployment

---

## Phase 17: Dify Chatbot Integration ✅

### 17.1 Replace Surfn.ai with Dify

- [x] Update `app/agent/[id]/page.js` with Dify iframe embed
- [x] Add premium styling with glassmorphism effects
- [x] Implement loading states and animations

### 17.2 Backend API Integration

- [x] Create `services/difyService.js` for API communication
- [x] Create `routes/dify.js` with sync endpoints
- [x] Add Dify configuration to `config/config.js`
- [x] Register routes in `server.js`

### 17.3 Environment Configuration

- [x] Add `DIFY_API_KEY` to `.env.example`
- [x] Add `DIFY_BASE_URL` configuration

---

## Quick Reference

| Component | Technology | Port/URL |
|-----------|------------|----------|
| Backend | Node.js + Express | :5000 |
| Frontend | Next.js 14 | :3000 |
| Database | PostgreSQL | - |
| Scraper | Puppeteer | - |

---

*Generated from Application instructions.md - AI Agent Hosting Platform V2.0*
