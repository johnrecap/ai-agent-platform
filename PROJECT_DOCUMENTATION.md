# 📘 AI Agent Platform - Complete Project Documentation

**Version:** 1.0.0  
**Last Updated:** December 13, 2025  
**Status:** Production-Ready MVP

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Features & Capabilities](#features--capabilities)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Frontend Structure](#frontend-structure)
7. [Backend Structure](#backend-structure)
8. [Deployment & Configuration](#deployment--configuration)
9. [Current Limitations](#current-limitations)
10. [Future Roadmap](#future-roadmap)

---

## 🎯 Project Overview

### What is this Platform?

**AI Agent Hosting Platform** هو نظام متكامل لاستضافة وإدارة chatbots مدعومة بالذكاء الاصطناعي. المنصة تسمح للمستخدمين بإنشاء وإدارة agents متعددة، تتبع المحادثات، وتكامل مع Dify AI.

### Key Purpose

- **For Businesses:** إنشاء وإدارة chatbots لخدمة العملاء
- **For Developers:** منصة SaaS لاستضافة AI agents
- **For Users:** واجهة سهلة لإدارة المحادثات والتفاعل مع العملاء

### Current State

✅ **Production-Ready MVP**  

- نظام authentication كامل
- إدارة agents ومحادثات
- تكامل مع Dify AI
- لوحة تحكم admin متقدمة
- Widget قابل للتضمين

---

## 🏗️ Technical Architecture

### Tech Stack

#### Backend

- **Runtime:** Node.js (Express 5.2.1)
- **Database:** PostgreSQL (via Sequelize ORM 6.37.7)
- **Authentication:** JWT (jsonwebtoken 9.0.3) + bcrypt
- **External APIs:** Axios للتواصل مع Dify
- **File Processing:**
  - `multer` - رفع الملفات
  - `xlsx` - معالجة Excel
  - `puppeteer` - web scraping (optional)
- **Scheduling:** node-cron لمهام دورية

#### Frontend

- **Framework:** Next.js 16.0.8 (React 19.2.1)
- **Styling:** TailwindCSS 4
- **State Management:** React Hooks + Context API
- **HTTP Client:** Axios
- **UI Notifications:** react-hot-toast
- **Fonts:** Google Fonts (Inter, Cairo)

#### Deployment

- **Backend:** Railway
- **Frontend:** Vercel (auto-deployment عبر GitHub)
- **Database:** NeonDB (PostgreSQL serverless)

### Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│              Next.js Frontend                    │
│  (Vercel - ai-agent-platform-three.vercel.app) │
└────────────────┬────────────────────────────────┘
                 │ HTTPS/REST API
┌────────────────▼────────────────────────────────┐
│           Express Backend API                    │
│        (Railway - backend server)                │
└────────────┬────────────┬────────────────────────┘
             │            │
    ┌────────▼──────┐  ┌──▼─────────┐
    │   PostgreSQL  │  │  Dify AI   │
    │    (NeonDB)   │  │   API      │
    └───────────────┘  └────────────┘
```

---

## ⚡ Features & Capabilities

### 1. User Management

#### Authentication System

- ✅ تسجيل دخول/تسجيل جديد
- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access (Admin, User)
- ✅ Protected routes
- ❌ Social login (Google/Facebook) - planned
- ❌ Two-Factor Authentication - planned
- ❌ Email verification - planned

#### User Roles

1. **Admin:**
   - إدارة كل المستخدمين
   - رؤية كل البيانات
   - إنشاء agents غير محدودة
   - تعيين agents للمستخدمين

2. **Regular User:**
   - إنشاء وإدارة agents خاصة
   - رؤية المحادثات الخاصة فقط
   - الوصول للـ agents المعينة له

### 2. Agent Management

#### Create & Configure Agents

- ✅ إنشاء agents جديدة
- ✅ تخصيص اسم الصفحة (`page_url`)
- ✅ ربط مع Dify agent
- ✅ حالات Agent (Active/Inactive)
- ✅ Embed code generator
- ✅ Widget customization (color, position, style)

#### Agent Assignment System

- ✅ Many-to-Many relationship بين Users و Agents
- ✅ تعيين agents للمستخدمين عبر `UserAgent` table
- ✅ رؤية المحادثات للـ agents المعينة
- ✅ صلاحيات مرنة

### 3. Conversation Management

#### Conversation Sources

1. **Dify Integration:**
   - Sync conversations من Dify API
   - Auto sync كل 1 ساعة (configurable)
   - حفظ conversation history كاملة
   - دعم metadata و messages

2. **Excel Upload:**
   - رفع محادثات من ملفات Excel
   - معالجة قراءات bulk
   - Validation للبيانات
   - تتبع uploaded files

#### Conversation Features

- ✅ List all conversations مع pagination
- ✅ Filter by agent
- ✅ Filter by user
- ✅ Dynamic agent tabs للتصنيف
- ✅ Search within conversations
- ✅ Message viewer مع دعم BiDi text
- ✅ Conversation metadata tracking

### 4. Admin Dashboard

#### Pages Available

1. **Dashboard:** إحصائيات عامة (basic)
2. **Users:** إدارة المستخدمين + تعيين agents
3. **Agents:** إدارة كل الـ agents
4. **Conversations:** عرض وتتبع المحادثات
5. **Analytics:** تحليلات (basic)
6. **Settings:** إعدادات النظام

#### Admin Features

- ✅ User management (create, edit, delete)
- ✅ Agent-User assignment
- ✅ View all conversations
- ✅ Dify sync management
- ✅ Excel upload handling
- ✅ Notifications system
- ✅ Command palette (⌘K)
- ✅ Chatbot widget (للدعم الداخلي)

### 5. Public Agent Pages

#### Agent Public Interface

- ✅ Unique URL لكل agent (`/agent/[pageUrl]`)
- ✅ Chat interface جاهزة
- ✅ رسائل real-time
- ✅ حفظ conversation history
- ✅ تصميم responsive
- ✅ Customizable branding

#### Widget Embed System

- ✅ JavaScript widget script
- ✅ Multiple styles (bubble, sidebar)
- ✅ Customizable colors  (#8b5cf6)
- ✅ Position control (bottom-right, etc.)
- ✅ Easy integration (single `<script>` tag)

---

## 🗄️ Database Schema

### Tables Structure

#### 1. **users**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user', -- 'admin' or 'user'
  agent_id INT, -- legacy, deprecated
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** تخزين بيانات المستخدمين والأدمن

#### 2. **agents**

```sql
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  agent_name VARCHAR(255) NOT NULL,
  page_title VARCHAR(255),
  page_url VARCHAR(255) UNIQUE NOT NULL,
  dify_agent_id VARCHAR(255),
  api_key VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active', -- 'active' or 'inactive'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** تخزين معلومات الـ AI agents

#### 3. **conversations**

```sql
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  agent_id INT REFERENCES agents(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(500),
  conversation_id VARCHAR(255), -- Dify conversation ID
  conversation_type VARCHAR(50), -- 'dify' or 'excel'
  messages JSON, -- Array of message objects
  metadata JSON, -- Additional data
  message_count INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** تخزين المحادثات والرسائل

#### 4. **user_agents** (Junction Table)

```sql
CREATE TABLE user_agents (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  agent_id INT REFERENCES agents(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, agent_id)
);
```

**Purpose:** ربط Many-to-Many بين Users و Agents

### Relationships

```
users (1) ──────────── (Many) agents
   │                              │
   │                              │
   └─── (Many) user_agents (Many)─┘
   │
   │
   └─── (1) ──────────── (Many) conversations
                                    │
agents (1) ──────────── (Many) ─────┘
```

### Indexes & Constraints

**Existing:**

- Primary keys على كل الجداول
- Unique constraints على `email`, `page_url`, `(user_id, agent_id)`
- Foreign keys مع CASCADE/SET NULL

**Recommended (للأداء):**

```sql
CREATE INDEX idx_conversations_agent_id ON conversations(agent_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_user_agents_user_id ON user_agents(user_id);
CREATE INDEX idx_user_agents_agent_id ON user_agents(agent_id);
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | تسجيل مستخدم جديد | Public |
| POST | `/login` | تسجيل دخول | Public |
| GET | `/me` | معلومات المستخدم الحالي | Private |

### Users (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | قائمة كل المستخدمين | Admin |
| GET | `/:id` | معلومات مستخدم محدد | Admin |
| POST | `/` | إنشاء مستخدم جديد | Admin |
| PUT | `/:id` | تحديث مستخدم | Admin |
| DELETE | `/:id` | حذف مستخدم | Admin |

### Agents (`/api/agents`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | قائمة الـ agents | Private |
| GET | `/:id` | معلومات agent محدد | Private |
| GET | `/page/:pageUrl` | agent عن طريق page URL | Public |
| POST | `/` | إنشاء agent جديد | Private |
| PUT | `/:id` | تحديث agent | Private |
| DELETE | `/:id` | حذف agent | Private |
| POST | `/sync-dify` | مزامنة الـ agents من Dify | Admin |

### Conversations (`/api/conversations`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | قائمة محادثات المستخدم الحالي | Private |
| GET | `/user/:userId` | محادثات مستخدم محدد | Private |
| GET | `/:id` | معلومات محادثة محددة | Private |
| POST | `/` | إنشاء محادثة جديدة | Private |
| POST | `/dify-sync` | مزامنة من Dify | Admin |
| POST | `/upload-excel` | رفع محادثات من Excel | Private |

### User-Agents (`/api/user-agents`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/my-agents` | الـ agents الخاصة بالمستخدم الحالي | Private |
| GET | `/:userId` | agents معينة لمستخدم | Admin |
| POST | `/:userId` | تعيين agents لمستخدم | Admin |
| DELETE | `/:userId/:agentId` | إزالة تعيين agent | Admin |

---

## 🎨 Frontend Structure

### Directory Layout

```
frontend/
├── app/                    # Next.js App Router
│   ├── admin/             # صفحات الأدمن
│   │   ├── agents/        # إدارة الـ agents
│   │   ├── analytics/     # التحليلات
│   │   ├── conversations/ # المحادثات
│   │   ├── settings/      # الإعدادات
│   │   ├── users/         # إدارة المستخدمين
│   │   └── layout.js      # Admin layout + sidebar
│   ├── agent/             # صفحات الـ agent العامة
│   │   └── [pageUrl]/     # Dynamic route
│   ├── dashboard/         # Dashboard للمستخدم
│   ├── login/             # تسجيل الدخول
│   ├── profile/           # صفحة البروفايل
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AdminSidebar.js
│   ├── AgentCard.js
│   ├── ChatInterface.js
│   ├── ChatbotWidget.js
│   ├── ConversationViewer.js
│   ├── EmbedCodeGenerator.js
│   ├── NotificationCenter.js
│   ├── Pagination.js
│   ├── ProtectedRoute.js
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities
│   ├── api.js             # Axios instance
│   ├── auth.js            # Auth helpers
│   └── language.js        # i18n support
└── public/                # Static assets
```

### Key Components

#### 1. **AdminSidebar.js**

- Navigation bar للأدمن
- Links لكل الصفحات
- User info display
- Dark theme support
- RTL support

#### 2. **ChatInterface.js**

- واجهة الدردشة
- Message input/output
- Real-time updates
- Message history
- Typing indicators

#### 3. **ConversationViewer.js**

- عرض المحادثات
- BiDi text support
- Emoji rendering
- Message bubbles
- Timestamps

#### 4. **NotificationCenter.js**

- نظام الإشعارات
- Real-time notifications
- Notification bell
- Notification panel
- Mark as read

#### 5. **ChatbotWidget.js**

- تحميل widget script
- Dynamic script injection
- Customizable settings
- Cleanup on unmount

### Routing Structure

```
/                           # Home page (public landing)
/login                      # Login page
/dashboard                  # User dashboard
/profile                    # User profile
/agent/[pageUrl]            # Public agent chat page
/admin                      # Admin redirect
/admin/users                # User management
/admin/agents               # Agent management
/admin/conversations        # Conversations list
/admin/analytics            # Analytics dashboard
/admin/settings             # Settings page
```

---

## 🔧 Backend Structure

### Directory Layout

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js    # Sequelize config
│   │   └── env.js         # Environment variables
│   ├── controllers/
│   │   ├── agentController.js
│   │   ├── authController.js
│   │   ├── conversationController.js
│   │   ├── excelUploadController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js        # JWT authentication
│   │   ├── adminAuth.js   # Admin authorization
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Agent.js
│   │   ├── Conversation.js
│   │   ├── UserAgent.js
│   │   └── index.js       # Model associations
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── agents.js
│   │   ├── conversations.js
│   │   ├── userAgents.js
│   │   ├── excelUpload.js
│   │   └── difySync.js
│   ├── services/
│   │   └── difyService.js # Dify API integration
│   ├── utils/
│   │   ├── validators.js
│   │   └── helpers.js
│   └── server.js          # Express app entry point
├── migrate-user-agents.js # DB migration script
├── migrate-user-id.js     # DB migration script
├── package.json
└── .env.example
```

### Key Controllers

#### 1. **authController.js**

- `register` - تسجيل مستخدم جديد
- `login` - تسجيل الدخول + JWT token
- `getMe` - معلومات المستخدم الحالي

#### 2. **userController.js**

- `getAllUsers` - قائمة المستخدمين (admin)
- `getUserById` - معلومات مستخدم
- `createUser` - إنشاء مستخدم
- `updateUser` - تحديث مستخدم
- `deleteUser` - حذف مستخدم

#### 3. **agentController.js**

- `getAllAgents` - قائمة الـ agents
- `getAgentById` - معلومات agent
- `getAgentByPageUrl` - agent عن طريق URL
- `createAgent` - إنشاء agent جديد
- `updateAgent` - تحديث agent
- `deleteAgent` - حذف agent
- `syncFromDify` - مزامنة من Dify

#### 4. **conversationController.js**

- `getConversations` - محادثات المستخدم الحالي
- `getUserConversations` - محادثات مستخدم محدد
- `getConversation` - معلومات محادثة
- `createConversation` - إنشاء محادثة
- `syncDifyConversations` - مزامنة من Dify

#### 5. **excelUploadController.js**

- `uploadExcel` - رفع ومعالجة ملف Excel
- Parse Excel data
- Validate conversations
- Bulk insert to database

### Services

#### difyService.js

```javascript
// Functions:
- syncConversations(agentId, difyAgentId, apiKey)
  // مزامنة المحادثات من Dify API
  
- getDifyConversations(baseUrl, apiKey)
  // جلب المحادثات من Dify
  
- saveConversationToDB(conversationData)
  // حفظ المحادثة في الداتابيز
```

---

## 🚀 Deployment & Configuration

### Environment Variables

#### Backend (.env)

```bash
# Server
PORT=5000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Dify API
DIFY_BASE_URL=https://api.dify.ai/v1
DIFY_API_KEY=your-dify-api-key

# CORS
FRONTEND_URL=https://ai-agent-platform-three.vercel.app
```

#### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

### Deployment Steps

#### Backend (Railway)

1. Push code to GitHub
2. Connect Railway to repository
3. Set environment variables
4. Deploy automatically on push

#### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Auto-deploy on push to main branch

### Database Setup (NeonDB)

1. Create PostgreSQL database
2. Get connection string
3. Add to `DATABASE_URL`
4. Models will auto-sync on first run

### Dify Integration Setup

1. Create agent في Dify dashboard
2. Get agent ID and API key
3. إضافتها في agent settings
4. تفعيل auto-sync

---

## ⚠️ Current Limitations

### 1. Authentication

- ❌ No email verification
- ❌ No password reset via email
- ❌ No social login (Google/Facebook)
- ❌ No 2FA
- ❌ Session management basic

### 2. Conversation Management

- ⚠️ BiDi text still has minor issues with complex Unicode
- ⚠️ No real-time messaging (polling only)
- ❌ No conversation export (PDF/CSV)
- ❌ No conversation search
- ❌ No message editing/deletion

### 3. Agent Features

- ❌ No agent templates
- ❌ No agent analytics
- ❌ No A/B testing
- ❌ No custom training
- ❌ Limited customization options

### 4. Dashboard & Analytics

- ⚠️ Basic statistics only
- ❌ No charts/graphs
- ❌ No export reports
- ❌ No real-time metrics
- ❌ No customer satisfaction tracking

### 5. Performance

- ⚠️ No caching layer (Redis)
- ⚠️ No CDN for static assets
- ⚠️ Basic query optimization
- ❌ No load balancing
- ❌ No database connection pooling

### 6. Security

- ⚠️ Basic rate limiting
- ❌ No CAPTCHA on registration
- ❌ No IP blocking
- ❌ No audit logs
- ❌ No GDPR compliance tools

### 7. Monetization

- ❌ No pricing/subscription system
- ❌ No payment integration (Stripe)
- ❌ No usage limits
- ❌ No billing dashboard

### 8. Multi-Language

- ⚠️ Partial i18n (Arabic/English UI)
- ❌ No complete translation
- ❌ Language switcher incomplete

---

## 🎯 Future Roadmap

راجع [`PRODUCTION_ROADMAP.md`](./PRODUCTION_ROADMAP.md) للخطة الكاملة.

### Priority 1 (شهر واحد)

1. Landing Page
2. Pricing & Subscriptions
3. Dashboard Analytics
4. Email Verification
5. Agent Page Enhancement

### Priority 2 (شهرين)

6. Complete i18n
7. Advanced Analytics
8. Notifications Enhancement
9. API Documentation
10. Security Hardening

### Priority 3 (3+ شهور)

11. Team Collaboration
12. PWA
13. Agent Templates
14. Performance Optimization
15. Advanced AI Features

---

## 📝 How to Run Locally

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Dify account (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

### Access

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:5000>
- Admin Panel: <http://localhost:3000/admin>

### Default Admin Credentials

```
Email: admin@example.com
Password: (check your database)
```

---

## 🤝 Contributing

للمساهمة في المشروع:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

للدعم الفني:

- GitHub Issues: [Create an issue](https://github.com/johnrecap/ai-agent-platform/issues)
- Email: <support@aiagentplatform.com> (if applicable)

---

## 📄 License

This project is licensed under the ISC License.

---

**Last Updated:** December 13, 2025  
**Project Status:** ✅ Production-Ready MVP  
**Next Milestone:** Landing Page + Pricing System
