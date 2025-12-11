/**
 * Logger Utility
 * AI Agent Hosting Platform
 */

const config = require('../config/config');

// ANSI color codes for terminal
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

/**
 * Format timestamp for logs
 */
const getTimestamp = () => {
    return new Date().toISOString();
};

/**
 * Logger object with different log levels
 */
const logger = {
    info: (message, ...args) => {
        console.log(`${colors.cyan}[${getTimestamp()}] INFO:${colors.reset}`, message, ...args);
    },

    success: (message, ...args) => {
        console.log(`${colors.green}[${getTimestamp()}] SUCCESS:${colors.reset}`, message, ...args);
    },

    warn: (message, ...args) => {
        console.log(`${colors.yellow}[${getTimestamp()}] WARN:${colors.reset}`, message, ...args);
    },

    error: (message, ...args) => {
        console.error(`${colors.red}[${getTimestamp()}] ERROR:${colors.reset}`, message, ...args);
    },

    debug: (message, ...args) => {
        if (config.nodeEnv === 'development') {
            console.log(`${colors.magenta}[${getTimestamp()}] DEBUG:${colors.reset}`, message, ...args);
        }
    },

    http: (method, url, status, duration) => {
        const color = status >= 500 ? colors.red : status >= 400 ? colors.yellow : colors.green;
        console.log(
            `${colors.blue}[${getTimestamp()}] HTTP:${colors.reset}`,
            `${method} ${url} ${color}${status}${colors.reset} ${duration}ms`
        );
    }
};

module.exports = logger;
