/**
 * Auth Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/register
// @desc    Register new user (admin only)
// @access  Private/Admin
router.post('/register', auth, adminAuth, authController.register);

// @route   GET /api/auth/me
// @desc    Get current user info
// @access  Private
router.get('/me', auth, authController.getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, authController.logout);

module.exports = router;
