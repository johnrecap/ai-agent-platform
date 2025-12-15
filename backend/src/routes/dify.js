/**
 * Dify Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    testConnection,
    syncConversations,
    getDifyStatus
} = require('../controllers/difyController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// @route   POST /api/dify/test
// @desc    Test Dify connection
// @access  Private
router.post('/test', testConnection);

// @route   POST /api/dify/sync
// @desc    Sync conversations from Dify
// @access  Private
router.post('/sync', syncConversations);

// @route   GET /api/dify/status
// @desc    Get Dify configuration status
// @access  Private
router.get('/status', getDifyStatus);

module.exports = router;
