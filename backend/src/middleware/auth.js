/**
 * JWT Authentication Middleware
 * AI Agent Hosting Platform
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');

/**
 * Middleware to verify JWT token
 * Adds user object to req.user if valid
 */
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: 'No authorization token provided'
            });
        }

        // Check if Bearer token
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format. Use: Bearer <token>'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);

        // Find user
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                error: 'Account is deactivated'
            });
        }

        // Attach user to request
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired'
            });
        }

        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            error: 'Authentication error'
        });
    }
};

module.exports = auth;
