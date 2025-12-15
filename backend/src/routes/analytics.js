/**
 * Analytics Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getOverviewStats,
    getSalesData,
    getSubscriberData,
    getConversationMetrics,
    getAgentPerformance
} = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All analytics routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/admin/analytics/overview
// @desc    Get overview statistics
// @access  Private/Admin
router.get('/overview', getOverviewStats);

// @route   GET /api/admin/analytics/sales
// @desc    Get sales data for charts
// @access  Private/Admin
router.get('/sales', getSalesData);

// @route   GET /api/admin/analytics/subscribers
// @desc    Get subscriber/user growth data
// @access  Private/Admin
router.get('/subscribers', getSubscriberData);

// @route   GET /api/admin/analytics/conversations
// @desc    Get conversation metrics
// @access  Private/Admin
router.get('/conversations', getConversationMetrics);

// @route   GET /api/admin/analytics/agents-performance
// @desc    Get agent performance metrics
// @access  Private/Admin
router.get('/agents-performance', getAgentPerformance);

module.exports = router;
