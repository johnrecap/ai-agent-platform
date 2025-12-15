/**
 * Get Conversations Controller
 * AI Agent Hosting Platform
 */

const { Conversation, Agent, User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { parsePaginationParams, buildPaginationResponse } = require('../../helpers/pagination');
const { paginatedSuccess, success } = require('../../helpers/responseBuilder');
const { getAccessibleAgentIds, canAccessConversation } = require('../../helpers/permissionChecker');
const { validateId, validateSearchQuery } = require('../../validators/conversationValidator');
const { isAdmin } = require('../../constants/userRoles');
const { Op } = require('sequelize');

/**
 * @route   GET /api/conversations
 * @desc    Get current user's conversations (works for both admin and regular users)
 * @access  Private
 */
const getConversations = async (req, res, next) => {
    try {
        const { page, limit, offset } = parsePaginationParams(req.query);
        const { status = '', agentId = '' } = req.query;

        // Get accessible agent IDs (owned + assigned)
        const agentIds = await getAccessibleAgentIds(req.user, {
            Agent,
            User
        });

        // Build where clause
        const whereClause = {
            [Op.or]: [
                { user_id: req.user.id },
                { agent_id: { [Op.in]: agentIds } }
            ]
        };

        if (status) whereClause.status = status;
        if (agentId) whereClause.agent_id = agentId;

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name'] },
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(conversations, pagination));
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
        const { page, limit, offset } = parsePaginationParams(req.query);

        // Validate user ID
        const validation = validateId(req.params.userId);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Users can only access their own conversations unless admin
        if (!isAdmin(req.user.role) && req.user.id !== parseInt(req.params.userId)) {
            throw new ApiError(403, 'Access denied');
        }

        // Fetch accessible agents for this user
        const agentIds = await getAccessibleAgentIds(
            { id: parseInt(req.params.userId) },
            { Agent, User }
        );

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: {
                [Op.or]: [
                    { user_id: req.params.userId },
                    { agent_id: { [Op.in]: agentIds } }
                ]
            },
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name', 'page_title'] }
            ]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(conversations, pagination));
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
        const { page, limit, offset } = parsePaginationParams(req.query);

        // Validate agent ID
        const validation = validateId(req.params.agentId);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const whereClause = { agent_id: req.params.agentId };

        // Check if user owns this agent or is admin
        const agent = await Agent.findByPk(req.params.agentId);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        if (!isAdmin(req.user.role)) {
            if (req.user.id !== agent.user_id) {
                throw new ApiError(403, 'Access denied');
            }
            // Filter by user_id for non-admins
            whereClause.user_id = req.user.id;
        }

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(conversations, pagination));
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
        // Validate conversation ID
        const validation = validateId(req.params.id);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const conversation = await Conversation.findByPk(req.params.id, {
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name', 'page_title', 'user_id'] },
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        // Check access rights using helper
        const hasAccess = await canAccessConversation(req.user, conversation, {
            Agent,
            UserAgent: require('../../models').UserAgent
        });

        if (!hasAccess) {
            throw new ApiError(403, 'Access denied');
        }

        res.json(success(conversation));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getConversations,
    getUserConversations,
    getAgentConversations,
    getConversation
};
