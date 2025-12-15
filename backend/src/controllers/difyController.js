/**
 * Dify Controller
 * AI Agent Platform
 */

const difyService = require('../services/difyService');
const { Agent, Conversation } = require('../models');

/**
 * Test Dify connection
 * @route POST /api/dify/test
 * @access Private
 */
const testConnection = async (req, res) => {
    try {
        const { apiKey, appId } = req.body;

        if (!apiKey || !appId) {
            return res.status(400).json({
                success: false,
                message: 'API Key and App ID are required'
            });
        }

        const result = await difyService.testConnection(apiKey, appId);

        res.json(result);
    } catch (error) {
        console.error('Test connection error:', error);
        res.status(500).json({
            success: false,
            message: 'Connection test failed',
            error: error.message
        });
    }
};

/**
 * Sync conversations from Dify
 * @route POST /api/dify/sync
 * @access Private
 */
const syncConversations = async (req, res) => {
    try {
        const { agentId } = req.body;

        // Get agent
        const agent = await Agent.findByPk(agentId);
        if (!agent) {
            return res.status(404).json({
                success: false,
                message: 'Agent not found'
            });
        }

        // Check if Dify is configured
        if (!agent.dify_api_key || !agent.dify_app_id) {
            return res.status(400).json({
                success: false,
                message: 'Dify not configured for this agent'
            });
        }

        // Sync from Dify
        const result = await difyService.syncConversations(
            agent.dify_api_key,
            agentId
        );

        // Save conversations to database
        for (const convData of result.conversations) {
            await Conversation.create({
                ...convData,
                user_id: req.user.id
            });
        }

        res.json({
            success: true,
            message: 'Sync completed successfully',
            data: {
                synced: result.synced
            }
        });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({
            success: false,
            message: 'Sync failed',
            error: error.message
        });
    }
};

/**
 * Get Dify status
 * @route GET /api/dify/status
 * @access Private
 */
const getDifyStatus = async (req, res) => {
    try {
        const { agentId } = req.query;

        if (!agentId) {
            // Return global status
            return res.json({
                success: true,
                data: {
                    configured: false,
                    message: 'No agent specified'
                }
            });
        }

        const agent = await Agent.findByPk(agentId);
        if (!agent) {
            return res.status(404).json({
                success: false,
                message: 'Agent not found'
            });
        }

        const status = difyService.checkStatus(agent);

        res.json({
            success: true,
            data: status
        });
    } catch (error) {
        console.error('Get status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get status',
            error: error.message
        });
    }
};

module.exports = {
    testConnection,
    syncConversations,
    getDifyStatus
};
