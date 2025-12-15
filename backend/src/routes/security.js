/**
 * Security Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getActivityLogs,
    createActivityLog,
    getSecurityStats
} = require('../controllers/securityController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/security/stats
// @desc    Get security statistics
// @access  Private/Admin
router.get('/stats', auth, adminAuth, getSecurityStats);

// @route   GET /api/security/logs
// @desc    Get activity logs
// @access  Private/Admin
router.get('/logs', auth, adminAuth, getActivityLogs);

// @route   POST /api/security/logs
// @desc    Create activity log
// @access  Private
router.post('/logs', auth, createActivityLog);

module.exports = router;
