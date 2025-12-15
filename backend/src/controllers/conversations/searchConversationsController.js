/**
 * Search Conversations Controller
 * AI Agent Hosting Platform
 */

const { Conversation, Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { parsePaginationParams, buildPaginationResponse } = require('../../helpers/pagination');
const { paginatedSuccess } = require('../../helpers/responseBuilder');
const { validateSearchQuery } = require('../../validators/conversationValidator');
const { isAdmin } = require('../../constants/userRoles');
const { Op } = require('sequelize');

/**
 * @route   GET /api/conversations/search
 * @desc    Search in conversations
 * @access  Private
 */
const searchConversations = async (req, res, next) => {
    try {
        const { page, limit, offset } = parsePaginationParams(req.query);
        const { q = '' } = req.query;

        // Validate search query
        const validation = validateSearchQuery(q);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Build where clause based on user role
        const whereClause = {
            [Op.or]: [
                { session_id: { [Op.iLike]: `%${q}%` } }
                // Note: Searching in JSONB messages would require raw SQL
            ]
        };

        // Non-admin users can only search their own conversations
        if (!isAdmin(req.user.role)) {
            whereClause.user_id = req.user.id;
        }

        const { count, rows: conversations } = await Conversation.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agent', attributes: ['id', 'agent_name'] }
            ]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(conversations, pagination));
    } catch (error) {
        next(error);
    }
};

module.exports = { searchConversations };
