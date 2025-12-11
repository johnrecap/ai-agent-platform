# AI AGENT HOSTING PLATFORM - COMPLETE PROJECT SPECIFICATION V2.0

## PROJECT OVERVIEW
Build a complete AI Agent hosting platform that allows admin to manage multiple AI agents embedded from surfn.ai, track conversations in real-time using intelligent scraping, and provide individual dashboards for users to view their agent's conversations in a beautiful chat interface.

---

## TECHNOLOGY STACK

**Frontend:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications
- JWT for authentication

**Backend:**
- Node.js 18+ with Express.js
- PostgreSQL database
- Sequelize ORM
- Puppeteer for intelligent scraping
- JWT authentication
- Bcrypt for password hashing
- CORS enabled
- Node-cron for scheduled tasks

**Scraper:**
- Puppeteer (headless Chrome)
- Queue system for handling multiple concurrent conversations
- Triggered scraping (starts when visitor opens chat page)
- Smart scraping with auto-stop
- Support for 50+ simultaneous conversations

---

## DATABASE SCHEMA

### Table: users
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin user (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@example.com', '$2b$10$rBV2kYEFwXm3qx5c9p8qNO8VGlxK6PJ9QnH0r0fQ8aZ7xH3mK5vXS', 'admin');
```

### Table: agents
```
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  agent_name VARCHAR(255) NOT NULL,
  iframe_code TEXT NOT NULL,
  iframe_url VARCHAR(500),
  page_url VARCHAR(255) UNIQUE NOT NULL,
  page_title VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: conversations
```
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES agents(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  thread_id VARCHAR(255),
  messages JSONB DEFAULT '[]',
  visitor_info JSONB,
  message_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_agent ON conversations(agent_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
```

### Table: scraper_sessions
```
CREATE TABLE scraper_sessions (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES agents(id) ON DELETE CASCADE,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scraper_status ON scraper_sessions(status);
```

---

## BACKEND STRUCTURE

### File Structure:
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Sequelize connection
│   │   └── config.js            # App configuration
│   ├── models/
│   │   ├── index.js             # Models export
│   │   ├── User.js
│   │   ├── Agent.js
│   │   ├── Conversation.js
│   │   └── ScraperSession.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── agentController.js
│   │   ├── conversationController.js
│   │   └── scraperController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── adminAuth.js         # Admin-only routes
│   │   └── errorHandler.js      # Global error handler
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── agents.js
│   │   ├── conversations.js
│   │   └── scraper.js
│   ├── services/
│   │   ├── scraperService.js    # Main scraper logic
│   │   ├── queueManager.js      # Queue management
│   │   └── cleanupService.js    # Cleanup old sessions
│   ├── utils/
│   │   ├── logger.js            # Logging utility
│   │   └── helpers.js           # Helper functions
│   └── server.js                # Main entry point
├── .env.example
├── package.json
└── README.md
```

---

## ENVIRONMENT VARIABLES

### Backend (.env):
```
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_agents_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Scraper Settings
MAX_CONCURRENT_SCRAPERS=20
SCRAPING_INTERVAL=15000
SCRAPER_TIMEOUT=600000
```

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## BACKEND API IMPLEMENTATION

### Standardized API Response Format:
```
// Success Response
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: "Error message",
  details: { ... }
}
```

### API Endpoints:

**Authentication:**
- `POST /api/auth/login` - Login (email, password) → returns { token, user }
- `POST /api/auth/register` - Register new user (admin only)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

**Users Management (Admin only):**
- `GET /api/users` - Get all users (with pagination & search)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/search?q=query` - Search users

**Agents Management (Admin only):**
- `GET /api/agents` - Get all agents (with pagination)
- `GET /api/agents/:id` - Get single agent
- `POST /api/agents` - Create new agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent
- `GET /api/agents/user/:userId` - Get user's agents
- `GET /api/agents/public` - Get all active agents (public endpoint)

**Conversations:**
- `GET /api/conversations` - Get all conversations (Admin)
- `GET /api/conversations/user/:userId` - Get user's conversations
- `GET /api/conversations/agent/:agentId` - Get agent conversations
- `GET /api/conversations/:id` - Get single conversation with full messages
- `GET /api/conversations/search?q=query` - Search in conversations

**Scraper:**
- `POST /api/scraper/trigger` - Trigger scraping for session
  ```
  {
    "agentId": 1,
    "sessionId": "session_123456"
  }
  ```
- `GET /api/scraper/status/:sessionId` - Get scraper status
- `GET /api/scraper/active` - Get all active scrapers
- `POST /api/scraper/stop/:sessionId` - Stop specific scraper
- `GET /api/scraper/stats` - Get scraper statistics

---

## SCRAPER SERVICE - ENHANCED IMPLEMENTATION

### scraperService.js - Complete Code:

```
const puppeteer = require('puppeteer');
const { Conversation, Agent, ScraperSession } = require('../models');

class ScraperService {
  constructor() {
    this.activeScrapers = new Map();
    this.maxConcurrent = parseInt(process.env.MAX_CONCURRENT_SCRAPERS) || 20;
    this.scrapingInterval = parseInt(process.env.SCRAPING_INTERVAL) || 15000; // 15 seconds
    this.scraperTimeout = parseInt(process.env.SCRAPER_TIMEOUT) || 600000; // 10 minutes
  }

  /**
   * Start scraping for a specific session
   */
  async startScraping(agentId, sessionId) {
    try {
      // Check if already scraping
      if (this.activeScrapers.has(sessionId)) {
        return { 
          success: false, 
          message: 'Already scraping this session',
          sessionId 
        };
      }

      // Check concurrent limit
      if (this.activeScrapers.size >= this.maxConcurrent) {
        return { 
          success: false, 
          message: 'Maximum concurrent scrapers reached',
          limit: this.maxConcurrent 
        };
      }

      // Get agent
      const agent = await Agent.findByPk(agentId);
      if (!agent) {
        throw new Error('Agent not found');
      }

      // Create scraper session record
      await ScraperSession.create({
        agent_id: agentId,
        session_id: sessionId,
        status: 'pending'
      });

      // Start scraping in background
      this.scrapeConversation(agentId, sessionId).catch(err => {
        console.error(`Scraper error for session ${sessionId}:`, err);
      });

      return { 
        success: true, 
        sessionId,
        message: 'Scraper started successfully'
      };
    } catch (error) {
      console.error('Error starting scraper:', error);
      throw error;
    }
  }

  /**
   * Main scraping logic
   */
  async scrapeConversation(agentId, sessionId) {
    let browser;
    let page;
    
    try {
      // Update session status
      await ScraperSession.update(
        { status: 'running', started_at: new Date() },
        { where: { session_id: sessionId } }
      );

      // Get agent
      const agent = await Agent.findByPk(agentId, {
        include: [{ model: require('../models').User, as: 'user' }]
      });

      if (!agent) throw new Error('Agent not found');

      // Extract iframe URL
      const iframeUrl = this.extractIframeUrl(agent.iframe_code);
      if (!iframeUrl) throw new Error('Invalid iframe code');

      // Launch browser
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
        ]
      });

      page = await browser.newPage();
      
      // Set viewport
      await page.setViewport({ width: 1280, height: 800 });
      
      // Navigate to iframe URL
      await page.goto(iframeUrl, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Mark as active
      this.activeScrapers.set(sessionId, { 
        browser, 
        page,
        active: true,
        startTime: Date.now()
      });

      let previousMessages = [];
      let noChangeCount = 0;
      let iterationCount = 0;

      // Scraping loop
      while (this.activeScrapers.get(sessionId)?.active) {
        try {
          iterationCount++;

          // Check timeout
          const elapsed = Date.now() - this.activeScrapers.get(sessionId).startTime;
          if (elapsed > this.scraperTimeout) {
            console.log(`Scraper timeout for session ${sessionId}`);
            break;
          }

          // Extract messages
          const messages = await this.extractMessages(page);

          // Check for new messages
          const messagesChanged = JSON.stringify(messages) !== JSON.stringify(previousMessages);

          if (messagesChanged && messages.length > 0) {
            // Save to database
            await this.saveConversation(agentId, agent.user_id, sessionId, messages);
            
            previousMessages = messages;
            noChangeCount = 0;

            console.log(`Session ${sessionId}: ${messages.length} messages saved`);
          } else {
            noChangeCount++;
          }

          // Auto-stop if no changes for 10 minutes (40 iterations * 15 seconds)
          if (noChangeCount > 40) {
            console.log(`No activity for session ${sessionId}, stopping scraper`);
            break;
          }

          // Wait before next iteration
          await new Promise(resolve => setTimeout(resolve, this.scrapingInterval));

        } catch (iterError) {
          console.error(`Iteration error for session ${sessionId}:`, iterError);
          
          // Increment error count
          await ScraperSession.increment('error_count', {
            where: { session_id: sessionId }
          });

          // Stop if too many errors
          const session = await ScraperSession.findOne({ 
            where: { session_id: sessionId } 
          });
          
          if (session && session.error_count > 10) {
            console.error(`Too many errors for session ${sessionId}, stopping`);
            break;
          }
        }
      }

      // Cleanup
      await this.cleanup(sessionId, browser, 'completed');

    } catch (error) {
      console.error(`Fatal error in scraper for session ${sessionId}:`, error);
      
      await ScraperSession.update(
        { 
          status: 'failed', 
          last_error: error.message,
          completed_at: new Date()
        },
        { where: { session_id: sessionId } }
      );

      await this.cleanup(sessionId, browser, 'failed');
    }
  }

  /**
   * Extract messages from page
   */
  async extractMessages(page) {
    try {
      const messages = await page.evaluate(() => {
        // Multiple selectors to try
        const selectors = [
          '[class*="message"]',
          '[class*="chat"]',
          '[data-message]',
          '.message',
          '.chat-message'
        ];

        const extracted = [];
        const seenMessages = new Set();

        for (const selector of selectors) {
          const elements = document.querySelectorAll(selector);
          
          elements.forEach(el => {
            const text = el.textContent?.trim();
            
            if (!text || text.length === 0 || text.length > 5000) return;
            if (seenMessages.has(text)) return;

            // Detect role based on class names
            const classList = el.classList.toString().toLowerCase();
            const isUser = classList.includes('user') || 
                          classList.includes('visitor') ||
                          classList.includes('customer');

            extracted.push({
              role: isUser ? 'user' : 'assistant',
              content: text,
              timestamp: new Date().toISOString()
            });

            seenMessages.add(text);
          });

          if (extracted.length > 0) break;
        }

        return extracted;
      });

      return messages;
    } catch (error) {
      console.error('Error extracting messages:', error);
      return [];
    }
  }

  /**
   * Save conversation to database
   */
  async saveConversation(agentId, userId, sessionId, messages) {
    try {
      let conversation = await Conversation.findOne({
        where: { session_id: sessionId }
      });

      if (!conversation) {
        conversation = await Conversation.create({
          agent_id: agentId,
          user_id: userId,
          session_id: sessionId,
          messages: messages,
          message_count: messages.length,
          status: 'active'
        });
      } else {
        await conversation.update({
          messages: messages,
          message_count: messages.length,
          updated_at: new Date()
        });
      }

      return conversation;
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }

  /**
   * Extract iframe URL from iframe code
   */
  extractIframeUrl(iframeCode) {
    const match = iframeCode.match(/src=["']([^"']+)["']/);
    return match ? match : null;[1]
  }

  /**
   * Cleanup resources
   */
  async cleanup(sessionId, browser, status = 'completed') {
    try {
      if (browser) {
        await browser.close();
      }

      this.activeScrapers.delete(sessionId);

      await ScraperSession.update(
        { status, completed_at: new Date() },
        { where: { session_id: sessionId } }
      );
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  /**
   * Stop scraping for specific session
   */
  stopScraping(sessionId) {
    const scraper = this.activeScrapers.get(sessionId);
    if (scraper) {
      scraper.active = false;
      return true;
    }
    return false;
  }

  /**
   * Get active scrapers
   */
  getActiveScrapers() {
    return Array.from(this.activeScrapers.keys());
  }

  /**
   * Get stats
   */
  getStats() {
    return {
      active: this.activeScrapers.size,
      limit: this.maxConcurrent,
      available: this.maxConcurrent - this.activeScrapers.size
    };
  }
}

module.exports = new ScraperService();
```

### cleanupService.js - Auto cleanup old sessions:

```
const cron = require('node-cron');
const { ScraperSession, Conversation } = require('../models');
const { Op } = require('sequelize');

class CleanupService {
  start() {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
      await this.cleanupOldSessions();
    });

    // Run daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      await this.cleanupOldConversations();
    });
  }

  async cleanupOldSessions() {
    try {
      // Delete sessions older than 24 hours
      const deleted = await ScraperSession.destroy({
        where: {
          created_at: {
            [Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000)
          },
          status: {
            [Op.in]: ['completed', 'failed']
          }
        }
      });

      console.log(`Cleaned up ${deleted} old scraper sessions`);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  async cleanupOldConversations() {
    try {
      // Delete empty conversations older than 7 days
      const deleted = await Conversation.destroy({
        where: {
          message_count: 0,
          created_at: {
            [Op.lt]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      });

      console.log(`Cleaned up ${deleted} empty conversations`);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

module.exports = new CleanupService();
```

---

## FRONTEND STRUCTURE

### File Structure:
```
frontend/
├── app/
│   ├── layout.js                   # Root layout
│   ├── page.js                     # Home page
│   ├── login/page.js               # Login page
│   ├── agent/[id]/page.js          # Agent chat page
│   ├── admin/
│   │   ├── layout.js               # Admin layout with sidebar
│   │   ├── page.js                 # Admin dashboard
│   │   ├── users/page.js           # User management
│   │   ├── agents/page.js          # Agent management
│   │   └── conversations/page.js   # Conversations view
│   └── dashboard/
│       ├── layout.js               # User dashboard layout
│       └── page.js                 # User conversations
├── components/
│   ├── Navbar.js
│   ├── AdminSidebar.js
│   ├── AgentCard.js
│   ├── ConversationViewer.js
│   ├── ChatInterface.js
│   ├── LoadingSpinner.js
│   ├── Pagination.js
│   ├── SearchBar.js
│   └── ProtectedRoute.js
├── lib/
│   ├── api.js                      # Axios instance
│   └── auth.js                     # Auth helpers
├── styles/
│   └── globals.css
└── tailwind.config.js
```

---

## KEY FRONTEND IMPLEMENTATIONS

### 1. api.js - Axios Configuration:
```
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Agent Chat Page - With Scraper Trigger:
```
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AgentChatPage() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    loadAgent();
    initSession();
  }, [id]);

  const loadAgent = async () => {
    try {
      const response = await api.get(`/api/agents/${id}`);
      setAgent(response.data.data);
    } catch (error) {
      console.error('Error loading agent:', error);
      toast.error('Failed to load agent');
    } finally {
      setLoading(false);
    }
  };

  const initSession = async () => {
    // Generate unique session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);

    // Trigger scraper
    try {
      await api.post('/api/scraper/trigger', {
        agentId: parseInt(id),
        sessionId: newSessionId
      });
      console.log('Scraper triggered for session:', newSessionId);
    } catch (error) {
      console.error('Failed to trigger scraper:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Agent Not Found
          </h1>
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {agent.page_title || agent.agent_name}
          </h1>
          {agent.description && (
            <p className="text-gray-600">{agent.description}</p>
          )}
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 border-t border-gray-200">
          <div 
            className="iframe-container"
            dangerouslySetInnerHTML={{ __html: agent.iframe_code }}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Session ID: {sessionId}</p>
          <p className="mt-2">Powered by AI Agent Platform</p>
        </div>
      </div>

      <style jsx>{`
        .iframe-container {
          width: 100%;
          min-height: 700px;
        }
        .iframe-container iframe {
          width: 100%;
          height: 700px;
          border: none;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
```

### 3. ConversationViewer Component:
```
export default function ConversationViewer({ conversation }) {
  if (!conversation || !conversation.messages || conversation.messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No messages in this conversation
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 max-h-[600px] overflow-y-auto">
      <div className="space-y-4">
        {conversation.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-xs font-semibold opacity-80">
                  {msg.role === 'user' ? '👤 User' : '🤖 AI Agent'}
                </span>
              </div>
              
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {msg.content}
              </p>
              
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                <span className="text-xs opacity-70">
                  {new Date(msg.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Admin Agents Page with Form:
```
'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    agent_name: '',
    user_id: '',
    iframe_code: '',
    page_title: '',
    description: ''
  });

  useEffect(() => {
    loadAgents();
    loadUsers();
  }, []);

  const loadAgents = async () => {
    try {
      const response = await api.get('/api/agents');
      setAgents(response.data.data);
    } catch (error) {
      toast.error('Failed to load agents');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Generate page URL
      const pageUrl = `/agent/${formData.agent_name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      
      const dataToSend = { ...formData, page_url: pageUrl };

      if (editingAgent) {
        await api.put(`/api/agents/${editingAgent.id}`, dataToSend);
        toast.success('Agent updated successfully');
      } else {
        await api.post('/api/agents', dataToSend);
        toast.success('Agent created successfully');
      }

      setShowModal(false);
      setEditingAgent(null);
      setFormData({
        agent_name: '',
        user_id: '',
        iframe_code: '',
        page_title: '',
        description: ''
      });
      loadAgents();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;

    try {
      await api.delete(`/api/agents/${id}`);
      toast.success('Agent deleted');
      loadAgents();
    } catch (error) {
      toast.error('Failed to delete agent');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Agents</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Agent
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Agent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Page URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {agent.agent_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {agent.page_title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {agent.user?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <a href={agent.page_url} target="_blank" rel="noopener noreferrer">
                    {agent.page_url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    agent.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingAgent(agent);
                      setFormData(agent);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingAgent ? 'Edit Agent' : 'Add New Agent'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.agent_name}
                  onChange={(e) => setFormData({...formData, agent_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select User *
                </label>
                <select
                  required
                  value={formData.user_id}
                  onChange={(e) => setFormData({...formData, user_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Iframe Code from Surfn.ai *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.iframe_code}
                  onChange={(e) => setFormData({...formData, iframe_code: e.target.value})}
                  placeholder='<iframe src="https://surfn.ai/agent-iframes/..." ...></iframe>'
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={formData.page_title}
                  onChange={(e) => setFormData({...formData, page_title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingAgent ? 'Update Agent' : 'Create Agent'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAgent(null);
                    setFormData({
                      agent_name: '',
                      user_id: '',
                      iframe_code: '',
                      page_title: '',
                      description: ''
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## DEPLOYMENT GUIDE

### 1. Database Setup (Neon.tech):
1. Go to https://neon.tech
2. Create free account
3. Create new project
4. Copy connection string
5. Run SQL schema to create tables

### 2. Backend Deployment (Railway.app):
1. Go to https://railway.app
2. Create new project from GitHub
3. Set environment variables
4. Deploy

### 3. Frontend Deployment (Vercel):
1. Go to https://vercel.com
2. Import from GitHub
3. Set NEXT_PUBLIC_API_URL
4. Deploy

---

## TESTING CHECKLIST

- [ ] Admin can login with default credentials
- [ ] Admin can create new users
- [ ] Admin can add agents with iframe code
- [ ] Agent pages are created automatically
- [ ] Visitors can access agent pages
- [ ] Scraper starts when visitor opens page
- [ ] Multiple concurrent conversations work
- [ ] Conversations are saved to database
- [ ] Users can login to their dashboard
- [ ] Users can view their conversations
- [ ] Conversations display in chat format
- [ ] Search functionality works
- [ ] Pagination works
- [ ] Responsive design on mobile

---

## SUCCESS CRITERIA

✅ Complete admin panel with all CRUD operations
✅ User dashboard with conversation viewing
✅ Real-time scraping with queue management
✅ Support for 50+ concurrent conversations
✅ Beautiful chat interface for conversation display
✅ Fully responsive design
✅ Secure authentication system
✅ Error handling and notifications
✅ Auto-cleanup of old data
✅ Production-ready deployment

---

## IMPORTANT NOTES

1. Use proper error handling in all API calls
2. Add loading states for better UX
3. Implement rate limiting in production
4. Use environment variables for all sensitive data
5. Add proper logging for debugging
6. Test with real surfn.ai iframe codes
7. Monitor scraper performance
8. Implement proper session management
9. Add input validation on both frontend and backend
10. Follow security best practices

---

START BUILDING NOW. Follow this specification exactly. Create a complete, production-ready AI Agent hosting platform with all features implemented.
```
