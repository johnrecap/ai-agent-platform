/**
 * Dify Routes
 * AI Agent Hosting Platform
 * 
 * Routes for Dify API integration and conversation syncing
 */

const express = require('express');
const router = express.Router();
const difyService = require('../services/difyService');
const authenticate = require('../middleware/auth');
const requireAdmin = require('../middleware/adminAuth');
const { ApiError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

/**
 * @route   GET /api/dify/status
 * @desc    Get Dify integration status
 * @access  Private/Admin
 */
router.get('/status', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const status = difyService.getStatus();
        const connected = await difyService.checkConnection();

        res.json({
            success: true,
            data: {
                ...status,
                connected
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/dify/sync
 * @desc    Sync conversations from Dify to local database
 * @access  Private/Admin
 */
router.post('/sync', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { agentId } = req.body;
        const userId = req.user.id;

        const status = difyService.getStatus();
        if (!status.configured) {
            throw new ApiError(400, 'Dify API key not configured. Set DIFY_API_KEY in environment.');
        }

        logger.info(`Starting Dify sync for user ${userId}...`);
        const results = await difyService.syncConversations(userId, agentId);

        res.json({
            success: true,
            message: `Synced ${results.synced} conversations successfully`,
            data: results
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/dify/conversations
 * @desc    Get conversations directly from Dify API
 * @access  Private/Admin
 */
router.get('/conversations', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { user = 'default', limit = 20 } = req.query;

        const status = difyService.getStatus();
        if (!status.configured) {
            throw new ApiError(400, 'Dify API key not configured');
        }

        const conversations = await difyService.getConversations(user, parseInt(limit));

        res.json({
            success: true,
            data: conversations,
            count: conversations.length
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/dify/conversations/:id/messages
 * @desc    Get messages for a specific Dify conversation
 * @access  Private/Admin
 */
router.get('/conversations/:id/messages', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user = 'default' } = req.query;

        const status = difyService.getStatus();
        if (!status.configured) {
            throw new ApiError(400, 'Dify API key not configured');
        }

        const messages = await difyService.getConversationMessages(id, user);

        res.json({
            success: true,
            data: messages,
            count: messages.length
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
