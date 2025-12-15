/**
 * Server Entry Point
 * AI Agent Hosting Platform
 * 
 * Express.js server configuration and startup
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');

// Import configuration
const config = require('./config/config');
const { testConnection, syncDatabase } = require('./config/database');
const { seedDefaultAdmin } = require('./models');

// Import middleware
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const agentRoutes = require('./routes/agents');
const conversationRoutes = require('./routes/conversations');
const difyRoutes = require('./routes/dify');
const chatRoutes = require('./routes/chat');
const userAgentRoutes = require('./routes/userAgents');
const avatarRoutes = require('./routes/avatarRoutes');
const analyticsRoutes = require('./routes/analytics');
const advancedAnalyticsRoutes = require('./routes/advancedAnalytics');
const productsRoutes = require('./routes/products');
const customersRoutes = require('./routes/customers');
const invoicesRoutes = require('./routes/invoices');
const paymentsRoutes = require('./routes/payments');
const integrationsRoutes = require('./routes/integrations');
const automationRoutes = require('./routes/automation');
const settingsRoutes = require('./routes/settings');
const securityRoutes = require('./routes/security');
const docsRoutes = require('./routes/docs');

// Import logger
const logger = require('./utils/logger');

// Create Express app
const app = express();

// ==========================================
// Middleware Configuration
// ==========================================

// Compression middleware for gzip/deflate (should be early in middleware stack)
app.use(compression({
    // Only compress responses above 1kb
    threshold: 1024,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// CORS configuration
app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.http(req.method, req.originalUrl, res.statusCode, duration);
    });
    next();
});

// ==========================================
// API Routes
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'AI Agent Platform API is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/dify', difyRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user-agents', userAgentRoutes);
app.use('/api', avatarRoutes); // Avatar upload routes
app.use('/api/admin/analytics', analyticsRoutes); // Analytics routes
app.use('/api/analytics/advanced', advancedAnalyticsRoutes); // Advanced Analytics routes
app.use('/api/products', productsRoutes); // Products routes
app.use('/api/customers', customersRoutes); // Customers routes
app.use('/api/invoices', invoicesRoutes); // Invoices routes
app.use('/api/payments', paymentsRoutes); // Payments routes
app.use('/api/integrations', integrationsRoutes); // Integrations routes
app.use('/api/automation', automationRoutes); // Automation routes
app.use('/api/settings', settingsRoutes); // Settings routes
app.use('/api/security', securityRoutes); // Security routes
app.use('/api/docs', docsRoutes); // Documentation routes

// ==========================================
// Error Handling
// ==========================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ==========================================
// Server Startup
// ==========================================

const startServer = async () => {
    try {
        logger.info('🚀 Starting AI Agent Platform...');

        // Test database connection
        logger.info('📊 Connecting to database...');
        await testConnection();

        // Sync database (create/update tables)
        logger.info('🔄 Synchronizing database...');
        await syncDatabase();

        // Seed default admin user
        logger.info('👤 Checking admin user...');
        await seedDefaultAdmin();

        // Start server
        const PORT = config.port;
        app.listen(PORT, () => {
            logger.success(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🤖 AI Agent Hosting Platform                           ║
║                                                          ║
║   Server running on port ${PORT}                           ║
║   Environment: ${config.nodeEnv.padEnd(12)}                       ║
║                                                          ║
║   API: http://localhost:${PORT}/api                        ║
║   Health: http://localhost:${PORT}/api/health               ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
      `);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully...');
    process.exit(0);
});

// Start the server
startServer();

module.exports = app;
