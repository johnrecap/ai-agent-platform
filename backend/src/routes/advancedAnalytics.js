/**
 * Advanced Analytics Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getRevenueAnalytics,
    getGrowthAnalytics,
    getTopProducts,
    getPaymentMethodsDistribution,
    getDashboardSummary
} = require('../controllers/advancedAnalyticsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All advanced analytics routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/analytics/advanced/revenue
// @desc    Get revenue analytics
// @access  Private/Admin
router.get('/revenue', getRevenueAnalytics);

// @route   GET /api/analytics/advanced/growth
// @desc    Get growth analytics
// @access  Private/Admin
router.get('/growth', getGrowthAnalytics);

// @route   GET /api/analytics/advanced/top-products
// @desc    Get top products
// @access  Private/Admin
router.get('/top-products', getTopProducts);

// @route   GET /api/analytics/advanced/payment-methods
// @desc    Get payment methods distribution
// @access  Private/Admin
router.get('/payment-methods', getPaymentMethodsDistribution);

// @route   GET /api/analytics/advanced/summary
// @desc    Get dashboard summary
// @access  Private/Admin
router.get('/summary', getDashboardSummary);

module.exports = router;
