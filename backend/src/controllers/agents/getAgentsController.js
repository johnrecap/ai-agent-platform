/**
 * Get Agents Controller
 * AI Agent Hosting Platform
 */

const { Agent, User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { parsePaginationParams, buildPaginationResponse } = require('../../helpers/pagination');
const { paginatedSuccess, success } = require('../../helpers/responseBuilder');

/**
 * @route   GET /api/agents
 * @desc    Get all agents (with pagination)
 * @access  Private/Admin
 */
const getAgents = async (req, res, next) => {
    try {
        const { page, limit, offset } = parsePaginationParams(req.query);
        const { status = '' } = req.query;

        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }

        const { count, rows: agents } = await Agent.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(agents, pagination));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/agents/:id
 * @desc    Get single agent
 * @access  Public (for viewing agent page)
 */
const getAgent = async (req, res, next) => {
    try {
        const agent = await Agent.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        res.json(success(agent));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/agents/user/:userId
 * @desc    Get user's agents
 * @access  Private
 */
const getUserAgents = async (req, res, next) => {
    try {
        const agents = await Agent.findAll({
            where: { user_id: req.params.userId },
            order: [['created_at', 'DESC']]
        });

        res.json(success(agents));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/agents/public
 * @desc    Get all active agents (public)
 * @access  Public
 */
const getPublicAgents = async (req, res, next) => {
    try {
        const agents = await Agent.findAll({
            where: { status: 'active' },
            attributes: ['id', 'agent_name', 'page_url', 'page_title', 'description'],
            order: [['created_at', 'DESC']]
        });

        res.json(success(agents));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAgents,
    getAgent,
    getUserAgents,
    getPublicAgents
};
