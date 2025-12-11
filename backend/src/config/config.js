/**
 * App Configuration
 * AI Agent Hosting Platform
 */

require('dotenv').config();

const config = {
    // Server configuration
    port: parseInt(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // JWT configuration
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        expire: process.env.JWT_EXPIRE || '24h'
    },

    // CORS configuration
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
    },

    // Scraper configuration
    scraper: {
        maxConcurrent: parseInt(process.env.MAX_CONCURRENT_SCRAPERS) || 20,
        interval: parseInt(process.env.SCRAPING_INTERVAL) || 15000, // 15 seconds
        timeout: parseInt(process.env.SCRAPER_TIMEOUT) || 600000 // 10 minutes
    },

    // Dify API configuration
    dify: {
        apiKey: process.env.DIFY_API_KEY || '',
        baseUrl: process.env.DIFY_BASE_URL || 'https://api.dify.ai/v1'
    },

    // Default admin credentials
    defaultAdmin: {
        name: 'Admin',
        email: 'admin@example.com',
        // Pre-hashed password for 'admin123'
        password: '$2b$10$rBV2kYEFwXm3qx5c9p8qNO8VGlxK6PJ9QnH0r0fQ8aZ7xH3mK5vXS',
        role: 'admin'
    }
};

module.exports = config;
