/**
 * Global Error Handler Middleware
 * AI Agent Hosting Platform
 */

const config = require('../config/config');

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

/**
 * 404 Not Found handler
 */
const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
    // Log error
    console.error('Error:', err.message);
    if (config.nodeEnv === 'development') {
        console.error('Stack:', err.stack);
    }

    // Default to 500 server error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let details = err.details || null;

    // Handle Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        details = err.errors.map(e => ({
            field: e.path,
            message: e.message
        }));
    }

    // Handle Sequelize unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = 'Duplicate Entry';
        details = err.errors.map(e => ({
            field: e.path,
            message: e.message
        }));
    }

    // Handle Sequelize foreign key constraint errors
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        message = 'Invalid Reference';
        details = { message: 'Referenced record does not exist' };
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Send error response
    const response = {
        success: false,
        error: message
    };

    if (details) {
        response.details = details;
    }

    // Include stack trace in development
    if (config.nodeEnv === 'development' && err.stack) {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = { ApiError, notFound, errorHandler };
