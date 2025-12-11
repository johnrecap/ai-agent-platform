/**
 * Conversation Controller
 * AI Agent Hosting Platform
 */

const { Conversation, Agent, User } = require('../models');
const { ApiError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * @route   GET /api/conversations
 * @desc    Get all conversations (Admin)
 * @access  Private/Admin
 */
const getConversations = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status = '', agentId = '' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (status) whereClause.status = status;
        if (agentId) whereClause.agent_id = agentId;

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name'] },
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        res.json({
            success: true,
            data: conversations,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/conversations/user/:userId
 * @desc    Get user's conversations
 * @access  Private
 */
const getUserConversations = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Users can only access their own conversations unless admin
        if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.userId)) {
            throw new ApiError(403, 'Access denied');
        }

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: { user_id: req.params.userId },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name', 'page_title'] }
            ]
        });

        res.json({
            success: true,
            data: conversations,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/conversations/agent/:agentId
 * @desc    Get agent conversations
 * @access  Private
 */
const getAgentConversations = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Check if user owns this agent or is admin
        const agent = await Agent.findByPk(req.params.agentId);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        if (req.user.role !== 'admin' && req.user.id !== agent.user_id) {
            throw new ApiError(403, 'Access denied');
        }

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: { agent_id: req.params.agentId },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: conversations,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/conversations/:id
 * @desc    Get single conversation with full messages
 * @access  Private
 */
const getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findByPk(req.params.id, {
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name', 'page_title'] },
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        // Check access rights - admins can view all, users can only view their own
        // Dify conversations may not have user_id, allow admin to view them
        const isAdmin = req.user.role === 'admin';
        const isOwner = conversation.user_id && req.user.id === conversation.user_id;

        if (!isAdmin && !isOwner) {
            throw new ApiError(403, 'Access denied');
        }

        res.json({
            success: true,
            data: conversation
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/conversations/search
 * @desc    Search in conversations
 * @access  Private
 */
const searchConversations = async (req, res, next) => {
    try {
        const { q = '', page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        if (!q || q.length < 2) {
            throw new ApiError(400, 'Search query must be at least 2 characters');
        }

        // Build where clause based on user role
        const whereClause = {
            [Op.or]: [
                { session_id: { [Op.iLike]: `%${q}%` } }
                // Note: Searching in JSONB messages would require raw SQL
            ]
        };

        // Non-admin users can only search their own conversations
        if (req.user.role !== 'admin') {
            whereClause.user_id = req.user.id;
        }

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name'] }
            ]
        });

        res.json({
            success: true,
            data: conversations,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getConversations,
    getUserConversations,
    getAgentConversations,
    getConversation,
    searchConversations
};

