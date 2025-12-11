/**
 * Auth Controller
 * AI Agent Hosting Platform
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');
const { ApiError } = require('../middleware/errorHandler');

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expire
    });
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            throw new ApiError(400, 'Please provide email and password');
        }

        // Find user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check if user is active
        if (!user.is_active) {
            throw new ApiError(401, 'Account is deactivated');
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            data: {
                token,
                user: user.toJSON()
            },
            message: 'Login successful'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/register
 * @desc    Register new user (admin only)
 * @access  Private/Admin
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        // Validate input
        if (!name || !email || !password) {
            throw new ApiError(400, 'Please provide name, email and password');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success: true,
            data: { user: user.toJSON() },
            message: 'User registered successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            data: { user: user.toJSON() }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client should remove token)
 * @access  Private
 */
const logout = async (req, res, next) => {
    try {
        // In a JWT-based system, we just tell the client to remove the token
        // For enhanced security, you could maintain a token blacklist
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
    getMe,
    logout
};
