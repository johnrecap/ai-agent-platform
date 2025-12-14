/**
 * Auth Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const { login, register, getMe, logout } = require('../controllers/auth');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/login', login);

// @route   POST /api/auth/register
// @desc    Register new user (admin only)
// @access  Private/Admin
router.post('/register', auth, adminAuth, register);

// @route   GET /api/auth/me
// @desc    Get current user info
// @access  Private
router.get('/me', auth, getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, logout);

module.exports = router;
