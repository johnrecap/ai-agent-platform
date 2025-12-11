/**
 * Agent Controller
 * AI Agent Hosting Platform
 */

const { Agent, User, Conversation } = require('../models');
const { ApiError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * @route   GET /api/agents
 * @desc    Get all agents (with pagination)
 * @access  Private/Admin
 */
const getAgents = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status = '' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }

        const { count, rows: agents } = await Agent.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        res.json({
            success: true,
            data: agents,
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

        res.json({
            success: true,
            data: agent
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/agents
 * @desc    Create new agent
 * @access  Private/Admin
 */
const createAgent = async (req, res, next) => {
    try {
        const { agent_name, iframe_code, page_url, page_title, description, dify_api_key } = req.body;

        // Use the authenticated user's ID
        const user_id = req.user.id;

        // Validate input - require agent_name and either iframe_code OR dify_api_key
        if (!agent_name) {
            throw new ApiError(400, 'Please provide agent_name');
        }

        if (!iframe_code && !dify_api_key) {
            throw new ApiError(400, 'Please provide either iframe_code or dify_api_key');
        }

        // Auto-generate page_url if not provided
        const finalPageUrl = page_url || `/agent/${agent_name.replace(/\s+/g, '-')}-${Date.now()}`;

        // Check if page_url is unique
        const existingAgent = await Agent.findOne({ where: { page_url: finalPageUrl } });
        if (existingAgent) {
            throw new ApiError(400, 'Page URL already exists');
        }

        // Create agent
        const agent = await Agent.create({
            user_id,
            agent_name,
            iframe_code: iframe_code || `<!-- Dify API Agent: ${agent_name} -->`,
            page_url: finalPageUrl,
            page_title: page_title || agent_name,
            description,
            dify_api_key
        });

        res.status(201).json({
            success: true,
            data: agent,
            message: 'Agent created successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/agents/:id
 * @desc    Update agent
 * @access  Private/Admin
 */
const updateAgent = async (req, res, next) => {
    try {
        const { user_id, agent_name, iframe_code, page_url, page_title, description, status, dify_api_key } = req.body;

        const agent = await Agent.findByPk(req.params.id);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        // If changing user_id, verify user exists
        if (user_id && user_id !== agent.user_id) {
            const user = await User.findByPk(user_id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            agent.user_id = user_id;
        }

        // If changing page_url, verify uniqueness
        if (page_url && page_url !== agent.page_url) {
            const existingAgent = await Agent.findOne({ where: { page_url } });
            if (existingAgent) {
                throw new ApiError(400, 'Page URL already exists');
            }
            agent.page_url = page_url;
        }

        // Update fields
        if (agent_name) agent.agent_name = agent_name;
        if (iframe_code) agent.iframe_code = iframe_code;
        if (page_title) agent.page_title = page_title;
        if (description !== undefined) agent.description = description;
        if (status) agent.status = status;
        if (dify_api_key !== undefined) agent.dify_api_key = dify_api_key;

        await agent.save();

        res.json({
            success: true,
            data: agent,
            message: 'Agent updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/agents/:id
 * @desc    Delete agent
 * @access  Private/Admin
 */
const deleteAgent = async (req, res, next) => {
    try {
        const agent = await Agent.findByPk(req.params.id);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        await agent.destroy();

        res.json({
            success: true,
            message: 'Agent deleted successfully'
        });
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

        res.json({
            success: true,
            data: agents
        });
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

        res.json({
            success: true,
            data: agents
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
    getUserAgents,
    getPublicAgents
};
